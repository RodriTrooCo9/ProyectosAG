[CmdletBinding()]
param([switch]$Comprobar)

# Generacion reproducible de la unica lamina canonica.
# -Comprobar renderiza en temporal y detecta entregables desactualizados sin cambiarlos.
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
$expectedVersion = 'v0.9.0'
$d2Command = Get-Command d2 -CommandType Application -ErrorAction Stop
$actualVersion = ((& $d2Command.Source --version) -join '').Trim()
if ($LASTEXITCODE -ne 0 -or $actualVersion -ne $expectedVersion) {
    throw "Se requiere D2 $expectedVersion. Version encontrada: $actualVersion. Actualiza la version fijada solo despues de revisar el renderizado."
}

$sourceName = 'arquitectura-completo'
$options = @(
    '--layout=elk', '--theme=0', '--dark-theme=-1', '--pad=45',
    '--sketch=false', '--center=false', '--bundle=true', '--watch=false',
    '--omit-version=false', '--elk-nodeNodeBetweenLayers=85',
    '--elk-edgeNodeBetweenLayers=35'
)
$tempRoot = [IO.Path]::GetFullPath([IO.Path]::GetTempPath()).TrimEnd('\', '/')
$stagingDir = [IO.Path]::GetFullPath((Join-Path $tempRoot ('d2-arquitectura-' + [guid]::NewGuid().ToString('N'))))
if (-not $stagingDir.StartsWith($tempRoot + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) {
    throw 'El directorio temporal debe estar dentro de TEMP.'
}
New-Item -ItemType Directory -Path $stagingDir | Out-Null
Push-Location $PSScriptRoot
try {
    $inputFile = Join-Path $PSScriptRoot ($sourceName + '.d2')
    $svgFile = Join-Path $stagingDir ($sourceName + '.svg')
    & $d2Command.Source validate $inputFile
    if ($LASTEXITCODE -ne 0) { throw "Sintaxis D2 invalida: $sourceName" }
    & $d2Command.Source @options '--scale=-1' $inputFile $svgFile
    if ($LASTEXITCODE -ne 0) { throw "No se pudo renderizar: $sourceName" }

    $document = New-Object System.Xml.XmlDocument
    $document.XmlResolver = $null
    $document.Load($svgFile)
    if ($document.DocumentElement.LocalName -ne 'svg') { throw "SVG invalido: $sourceName" }
    $images = $document.SelectNodes("//*[local-name()='image']")
    if ($images.Count -eq 0) { throw "Faltan iconos: $sourceName" }
    foreach ($item in $images) {
        $href = $item.GetAttribute('href', 'http://www.w3.org/1999/xlink')
        if (-not $href) { $href = $item.GetAttribute('href') }
        if (-not $href.StartsWith('data:image/')) { throw "Icono no incorporado en $sourceName : $href" }
    }

    # La exportacion PNG comprueba tambien que los SVG de los iconos son compatibles.
    & $d2Command.Source @options '--scale=0.8' $inputFile (Join-Path $stagingDir 'arquitectura-completo.png')
    if ($LASTEXITCODE -ne 0) { throw 'No se pudo generar la vista PNG.' }
    $outputs = @('arquitectura-completo.svg', 'arquitectura-completo.png')

    if ($Comprobar) {
        $outdated = @()
        foreach ($filename in $outputs) {
            $existing = Join-Path $PSScriptRoot $filename
            if (-not (Test-Path -LiteralPath $existing)) { $outdated += $filename; continue }
            $expected = (Get-FileHash -Algorithm SHA256 -LiteralPath (Join-Path $stagingDir $filename)).Hash
            $actual = (Get-FileHash -Algorithm SHA256 -LiteralPath $existing).Hash
            if ($expected -ne $actual) { $outdated += $filename }
        }
        if ($outdated.Count -gt 0) { throw ('Entregables desactualizados: ' + ($outdated -join ', ')) }
        Write-Host 'OK: SVG valido, iconos incorporados y entregables actualizados.'
    } else {
        # Reemplazar los entregables solo despues de completar todas las validaciones.
        foreach ($filename in $outputs) {
            Copy-Item -LiteralPath (Join-Path $stagingDir $filename) -Destination (Join-Path $PSScriptRoot $filename) -Force
        }
        Write-Host 'Generados: arquitectura-completo.svg y arquitectura-completo.png.'
    }
} finally {
    Pop-Location
    # Ruta absoluta verificada al crearla; solo se elimina el temporal de esta ejecucion.
    if ($stagingDir.StartsWith($tempRoot + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) {
        Remove-Item -LiteralPath $stagingDir -Recurse -Force
    }
}
