# Import official Darb 1718 Overview 2026 source media into this GitHub checkout.
# This is ARCHIVE INGESTION, not website implementation.
# Usage from repo root on Windows:
#   powershell -ExecutionPolicy Bypass -File .\source-material\import-overview-media.ps1 -ZipPath "C:\Downloads\darb1718_research_media_2026-11-02.zip"
param([Parameter(Mandatory=$true)][string]$ZipPath)

$ErrorActionPreference = 'Stop'
$Repo = Split-Path $PSScriptRoot -Parent
$Zip = (Resolve-Path $ZipPath).Path
$ExpectedSha = "07c59412bfd9c9c85314d54069e8a0e2a9e5db5472247ca690505969085a9b74"
$Temp = Join-Path ([System.IO.Path]::GetTempPath()) ("darb1718-ingest-" + [guid]::NewGuid().ToString("N"))

try {
  if (-not (Test-Path (Join-Path $Repo ".git"))) {
    throw "Run this script from the cloned darb repository (repository .git folder missing)."
  }
  $Origin = & git -C $Repo remote get-url origin
  if ($LASTEXITCODE -ne 0 -or $Origin -notmatch "omarkhair70-droid/darb") {
    throw "Git remote does not match omarkhair70-droid/darb. Nothing changed."
  }
  New-Item -ItemType Directory -Path $Temp -Force | Out-Null
  Expand-Archive -LiteralPath $Zip -DestinationPath $Temp
  $Source = Join-Path $Temp "darb1718_research_media_2026-11-02"
  $Original = Join-Path $Source "Darb_1718_Overview_2026_original.pdf"
  if (-not (Test-Path $Original)) { throw "Original PDF not found in ZIP." }
  $Hash = (Get-FileHash -LiteralPath $Original -Algorithm SHA256).Hash.ToLowerInvariant()
  if ($Hash -ne $ExpectedSha) { throw "PDF SHA-256 mismatch! Archive not imported." }
  $Imgs = @(Get-ChildItem -File (Join-Path $Source "images_from_supplied_overview"))
  $Pages = @(Get-ChildItem -File (Join-Path $Source "page_previews"))
  if ($Imgs.Count -ne 77 -or $Pages.Count -ne 21) {
    throw "Expected 77 image objects and 21 page previews; found $($Imgs.Count) and $($Pages.Count)."
  }

  & git -C $Repo status --porcelain
  if ((& git -C $Repo status --porcelain).Count -gt 0) {
    throw "Working tree is not clean; commit or stash local changes before media import."
  }
  $Branch = "media/darb-overview-2026-source"
  & git -C $Repo switch -c $Branch
  if ($LASTEXITCODE -ne 0) { throw "Unable to create media branch." }

  $destPdf = Join-Path $Repo "source-material/original"
  $destImg = Join-Path $Repo "assets/original"
  $destPages = Join-Path $Repo "assets/previews"
  $destSheets = Join-Path $Repo "assets/contact-sheets"
  foreach ($d in @($destPdf,$destImg,$destPages,$destSheets)) {
    New-Item -ItemType Directory -Path $d -Force | Out-Null
  }
  Copy-Item -LiteralPath $Original -Destination (Join-Path $destPdf "Darb_1718_Overview_2026.pdf")
  Copy-Item -Path (Join-Path $Source "images_from_supplied_overview/*") -Destination $destImg
  Copy-Item -Path (Join-Path $Source "page_previews/*") -Destination $destPages
  Copy-Item -LiteralPath (Join-Path $Source "overview_contact_sheet.jpg") -Destination $destSheets
  Copy-Item -LiteralPath (Join-Path $Source "77_assets_contact_sheet.jpg") -Destination $destSheets
  Copy-Item -LiteralPath (Join-Path $Source "image_manifest.json") -Destination (Join-Path $Repo "assets/manifest-original.json")

  & git -C $Repo add source-material/original assets/original assets/previews assets/contact-sheets assets/manifest-original.json
  if ($LASTEXITCODE -ne 0) { throw "Git add failed." }
  & git -C $Repo commit -m "Archive official Overview PDF, 77 source assets and 21 page previews"
  if ($LASTEXITCODE -ne 0) { throw "Git commit failed." }
  & git -C $Repo push --set-upstream origin $Branch
  if ($LASTEXITCODE -ne 0) { throw "Push failed. Local commit remains on $Branch." }
  Write-Host "Success. Media archived on branch: $Branch"
  Write-Host "Next: open a PR from this branch to main."
} finally {
  if (Test-Path $Temp) { Remove-Item -LiteralPath $Temp -Recurse -Force }
}
