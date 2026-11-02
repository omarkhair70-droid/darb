#!/usr/bin/env python3
"""Extract the approved Darb 1718 source PDF for archival upload. No website build."""
import argparse, csv, hashlib, json, shutil
from pathlib import Path
import fitz
from PIL import Image, ImageDraw

EXPECTED = "07c59412bfd9c9c85314d54069e8a0e2a9e5db5472247ca690505969085a9b74"

def make_sheet(paths, dest, cols, size, labels):
    w, h = size
    result = Image.new("RGB", (cols*w, ((len(paths)+cols-1)//cols)*h), "#e8e6e2")
    d = ImageDraw.Draw(result)
    for i,p in enumerate(paths):
        with Image.open(p) as raw: im = raw.convert("RGB")
        im.thumbnail((w-16,h-40), Image.Resampling.LANCZOS)
        x,y=(i%cols)*w,(i//cols)*h
        result.paste(im,(x+(w-im.width)//2,y+6))
        d.text((x+10,y+h-27),labels[i],fill="black")
    dest.parent.mkdir(parents=True,exist_ok=True)
    result.save(dest,quality=86)

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument("--pdf",type=Path,required=True)
    ap.add_argument("--repo",type=Path,required=True)
    a=ap.parse_args()
    pdf=a.pdf.resolve()
    repo=a.repo.resolve()
    if not pdf.is_file(): raise SystemExit("PDF not found: "+str(pdf))
    if hashlib.sha256(pdf.read_bytes()).hexdigest()!=EXPECTED:
        raise SystemExit("PDF hash differs from the approved supplied file; stopping safely.")
    source=repo/"source-material"/"original"
    media=repo/"assets"/"original"
    preview=repo/"assets"/"previews"
    sheets=repo/"assets"/"contact-sheets"
    for p in (source,media,preview,sheets): p.mkdir(parents=True,exist_ok=True)
    shutil.copy2(pdf,source/"Darb_1718_Overview_2026.pdf")
    doc=fitz.open(pdf)
    if len(doc)!=21: raise SystemExit(f"Expected 21 pages, got {len(doc)}")
    images=[];pages=[];entries=[];seen=set()
    for page_no,page in enumerate(doc,1):
        for n,ref in enumerate(page.get_images(full=True),1):
            xref=ref[0]
            if xref in seen: continue
            seen.add(xref)
            obj=doc.extract_image(xref)
            target=media/f"pdf_image_{xref:04d}.{obj['ext'].lower()}"
            target.write_bytes(obj["image"])
            images.append(target)
            entries.append({"page":page_no,"image_order":n,"pdf_xref":xref,
              "filename":target.name,"width":ref[2],"height":ref[3],
              "sha256":hashlib.sha256(obj["image"]).hexdigest(),
              "source":"Commissioner-supplied Darb 1718 Overview 2026",
              "rights":"Commissioner-approved for website; individual captions/credits pending"})
        target=preview/f"page_{page_no:02d}.png"
        page.get_pixmap(matrix=fitz.Matrix(1,1),alpha=False).save(str(target))
        pages.append(target)
    if len(images)!=77: raise SystemExit(f"Expected 77 image objects; got {len(images)}")
    (repo/"assets"/"manifest-original.json").write_text(
       json.dumps(entries,ensure_ascii=False,indent=2),encoding="utf-8")
    with (repo/"assets"/"manifest-original.csv").open("w",encoding="utf-8-sig",newline="") as f:
        writer=csv.DictWriter(f,fieldnames=entries[0].keys())
        writer.writeheader();writer.writerows(entries)
    make_sheet(pages,sheets/"overview_contact_sheet.jpg",5,(230,230),
               [f"Page {i:02d}" for i in range(1,22)])
    make_sheet(images,sheets/"77_assets_contact_sheet.jpg",7,(245,196),
               [f"{i+1:02d}  p{rec['page']:02d} / {rec['pdf_xref']}"
                 for i,rec in enumerate(entries)])
    print("SUCCESS: 21 pages / 77 extracted images / 2 contact sheets / manifests; source PDF verified")

if __name__=="__main__": main()
