# Darb 1718 source upload from original PDF. Research archive only: no site build.
# Usage after git clone: powershell -ExecutionPolicy Bypass -File .\source-material\upload_from_pdf.ps1
param([string] $PdfPath)
$ErrorActionPreference = 'Stop'
$Repo = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$Expected = '07c59412bfd9c9c85314d54069e8a0e2a9e5db5472247ca690505969085a9b74'

function Assert-Git {
    param([string[]]$GitArgs)
    & git @GitArgs
    if ($LASTEXITCODE -ne 0) { throw "Git failed: $($GitArgs -join ' ')" }
}
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    throw 'Git missing. Install Git for Windows from git-scm.com/download/win first.'
}
if (-not (Test-Path (Join-Path $Repo '.git'))) {
    throw 'This script must run from an actual cloned darb repository.'
}
if ([string]::IsNullOrWhiteSpace($PdfPath)) {
    Add-Type -AssemblyName System.Windows.Forms
    $picker = New-Object System.Windows.Forms.OpenFileDialog
    $picker.Title = 'Choose the original Darb 1718 Overview 2026 PDF'
    $picker.Filter = 'PDF files (*.pdf)|*.pdf'
    if ($picker.ShowDialog() -ne [System.Windows.Forms.DialogResult]::OK) {
        throw 'No PDF selected; no changes made.'
    }
    $PdfPath = $picker.FileName
}
$PdfPath = (Resolve-Path -LiteralPath $PdfPath).Path
$Actual = (Get-FileHash -LiteralPath $PdfPath -Algorithm SHA256).Hash.ToLowerInvariant()
if ($Actual -ne $Expected) { throw "Wrong PDF or altered file; original SHA-256 does not match." }

$Python = $null
$PyArgs = @()
if (Get-Command py -ErrorAction SilentlyContinue) {
    & py -3 --version 2>$null
    if ($LASTEXITCODE -eq 0) { $Python = 'py'; $PyArgs = @('-3') }
}
if (-not $Python -and (Get-Command python -ErrorAction SilentlyContinue)) {
    & python --version 2>$null
    if ($LASTEXITCODE -eq 0) { $Python = 'python'; $PyArgs = @() }
}
if (-not $Python) {
    throw 'Python 3 missing. Install Python from python.org/downloads/windows and rerun.'
}
Write-Host '1/5  Original PDF verified.' -ForegroundColor Cyan
& $Python @PyArgs -c 'import fitz; from PIL import Image' 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host 'Installing PDF/image extraction tools...'
    & $Python @PyArgs -m pip install --disable-pip-version-check 'pymupdf>=1.23' 'Pillow>=10'
    if ($LASTEXITCODE -ne 0) { throw 'Installing PyMuPDF/Pillow failed; check Python and internet.' }
}

Push-Location $Repo
try {
    $Origin = & git remote get-url origin
    if ($LASTEXITCODE -ne 0 -or $Origin -notmatch 'omarkhair70-droid/darb') {
        throw 'Not the expected Darb GitHub repository.'
    }
    $Changes = @(& git status --porcelain)
    if (($Changes | Where-Object { $_.Trim() }).Count -gt 0) {
        throw 'Working tree has changes. Use a fresh clone or commit/stash first.'
    }
    Assert-Git @('fetch','origin')
    Assert-Git @('switch','main')
    Assert-Git @('pull','--ff-only','origin','main')
    $Branch = 'research/overview-2026-media-' + (Get-Date -Format 'yyyyMMdd-HHmmss')
    Assert-Git @('switch','-c',$Branch)
    Write-Host "2/5  Created branch $Branch" -ForegroundColor Cyan

    $Extractor = Join-Path $PSScriptRoot 'extract_overview_pdf.py'
    & $Python @PyArgs $Extractor --pdf $PdfPath --repo $Repo
    if ($LASTEXITCODE -ne 0) { throw 'PDF image extraction failed.' }
    Write-Host '3/5  Extracted 77 assets and 21 page previews.' -ForegroundColor Cyan
    Assert-Git @('add','source-material/original','assets/original','assets/previews',
                  'assets/contact-sheets','assets/manifest-original.csv','assets/manifest-original.json')
    Assert-Git @('commit','-m','Archive Darb 2026 Overview PDF, 77 assets and 21 page previews')
    Write-Host '4/5  Committed source assets.' -ForegroundColor Cyan
    Assert-Git @('push','--set-upstream','origin',$Branch)
    Write-Host "5/5  SUCCESS. Source files now on Github branch $Branch" -ForegroundColor Green
    Write-Host "https://github.com/omarkhair70-droid/darb/tree/$Branch"
    Write-Host "Review for merge: https://github.com/omarkhair70-droid/darb/compare/main...$Branch"
} finally { Pop-Location }
