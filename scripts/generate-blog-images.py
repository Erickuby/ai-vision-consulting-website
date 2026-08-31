#!/usr/bin/env python3
"""Generate original AI Vision Consulting blog artwork as 1600x900 PNG files."""
from __future__ import annotations

from pathlib import Path
import math
import random
import sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter

W, H = 1600, 900
OUT = Path(__file__).resolve().parents[1] / "public" / "images" / "blog"
OUT.mkdir(parents=True, exist_ok=True)

NAVY = (5, 13, 26)
NAVY_2 = (11, 30, 52)
TEAL = (13, 148, 136)
CYAN = (46, 196, 199)
GOLD = (212, 168, 83)
WHITE = (240, 244, 255)
MUTED = (155, 175, 194)
# The artwork was first produced on Linux. Keep those paths first so existing
# images stay byte-identical there, and fall back to equivalents elsewhere.
FONT_CANDIDATES = [
    "/usr/share/fonts/truetype/ubuntu/UbuntuSans[wdth,wght].ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    str(Path(sys.prefix) / "Lib/site-packages/matplotlib/mpl-data/fonts/ttf/DejaVuSans.ttf"),
    "C:/Windows/Fonts/segoeui.ttf",
]
FONT_BOLD_CANDIDATES = [
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    str(Path(sys.prefix) / "Lib/site-packages/matplotlib/mpl-data/fonts/ttf/DejaVuSans-Bold.ttf"),
    "C:/Windows/Fonts/segoeuib.ttf",
]


def first_existing(candidates: list[str]) -> str:
    for candidate in candidates:
        if Path(candidate).exists():
            return candidate
    raise SystemExit(f"No usable font found among {candidates}")


FONT = first_existing(FONT_CANDIDATES)
FONT_BOLD = first_existing(FONT_BOLD_CANDIDATES)

ARTICLES = [
    ("what-is-ai", "AI FUNDAMENTALS", "What is AI?", "A plain-English guide", "network"),
    ("8-ai-prompts-every-job-seeker-needs-right-now", "JOB SEARCH", "8 AI prompts", "for a focused job search", "prompts"),
    ("use-ai-civil-service-application", "CIVIL SERVICE", "Use AI without", "losing your voice", "civil"),
    ("ai-training-for-employees", "AI TRAINING", "Practical AI training", "that changes how work gets done", "training"),
    ("what-to-automate-first-small-business", "SMALL BUSINESS", "What should you", "automate first?", "workflow"),
    ("whatsapp-lead-automation-small-business", "LEAD HANDLING", "Automate the routine.", "Keep judgement human.", "messages"),
    ("ai-chatbot-for-your-website", "WEBSITE CHATBOTS", "Does your website", "need an AI chatbot?", "chatbot"),
    ("how-to-start-an-ai-side-hustle", "FREELANCING", "Start with a problem.", "Build one useful service.", "service"),
    ("north-east-ai-growth-zone-small-business", "GROWTH ZONE", "The AI Growth Zone", "and your small business", "region"),
    ("get-found-in-ai-search-local-business", "AI SEARCH", "Get found when", "customers ask an assistant", "aisearch"),
    ("ai-courses-newcastle", "AI COURSES", "Learn AI in Newcastle", "free, funded or paid", "courses"),
    ("ai-hallucination-and-rag", "AI SAFETY", "Why AI makes things up", "and how grounding helps", "grounding"),
    ("copilot-agent-mode-word-excel-powerpoint", "AGENT MODE", "Copilot edits the file", "instead of advising you", "workflow"),
    ("copilot-researcher-and-analyst-agents", "COPILOT AGENTS", "Researcher and Analyst", "and when they earn their keep", "aisearch"),
    ("copilot-cowork-and-credits", "COPILOT COWORK", "Whole tasks, delivered", "and billed by difficulty", "service"),
    ("why-copilot-rollouts-stall", "COPILOT ROLLOUT", "Licences do not", "create the return, use does", "training"),
    ("copilot-notebooks-and-memory", "COPILOT MEMORY", "Stop explaining yourself", "at the start of every chat", "grounding"),
    ("copilot-oversharing-data-readiness", "DATA READINESS", "What can Copilot see?", "Fix sharing before rollout", "civil"),
]


def font(size: int, bold: bool = False):
    return ImageFont.truetype(FONT_BOLD if bold else FONT, size=size)


def fit_font(draw: ImageDraw.ImageDraw, text: str, preferred: int, max_width: int, bold: bool = False):
    size = preferred
    while size > 38:
        candidate = font(size, bold)
        if draw.textlength(text, font=candidate) <= max_width:
            return candidate
        size -= 2
    return font(size, bold)


def gradient_background(seed: int) -> Image.Image:
    random.seed(seed)
    img = Image.new("RGB", (W, H), NAVY)
    px = img.load()
    for y in range(H):
        for x in range(W):
            t = x / W
            v = y / H
            glow = max(0.0, 1.0 - math.hypot((x - 1260) / 760, (y - 420) / 620))
            r = int(NAVY[0] * (1 - t) + NAVY_2[0] * t + glow * 4)
            g = int(NAVY[1] * (1 - t) + NAVY_2[1] * t + glow * 20)
            b = int(NAVY[2] * (1 - t) + NAVY_2[2] * t + glow * 24)
            px[x, y] = (min(r, 255), min(g, 255), min(b, 255))
    return img


def add_grid(draw: ImageDraw.ImageDraw):
    for x in range(820, W, 80):
        draw.line((x, 110, x, 790), fill=(37, 74, 93), width=1)
    for y in range(150, 791, 80):
        draw.line((780, y, 1540, y), fill=(37, 74, 93), width=1)


def glow_dot(layer: Image.Image, xy, colour, radius=18):
    x, y = xy
    glow = Image.new("RGBA", layer.size, (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    for r, a in [(radius * 4, 12), (radius * 2, 28), (radius, 220)]:
        gd.ellipse((x-r, y-r, x+r, y+r), fill=(*colour, a))
    glow = glow.filter(ImageFilter.GaussianBlur(radius // 2))
    layer.alpha_composite(glow)


def rounded(draw, box, fill, outline=None, width=1, radius=26):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def motif_network(draw, layer):
    centre = (1190, 445)
    nodes = [(930,280),(1080,210),(1320,230),(1450,365),(1420,610),(1230,690),(1010,630),(900,460)]
    for p in nodes:
        draw.line((*centre,*p), fill=(*CYAN,110), width=3)
    rounded(draw, (1080,330,1300,560), (11,30,52,245), (*CYAN,170), 3, 80)
    draw.ellipse((1144,360,1236,452), fill=(*GOLD,230))
    draw.rounded_rectangle((1120,448,1260,522), radius=34, fill=(*TEAL,220))
    for i,p in enumerate(nodes):
        glow_dot(layer,p, CYAN if i%3 else GOLD, 11)
        draw.ellipse((p[0]-11,p[1]-11,p[0]+11,p[1]+11), fill=(*WHITE,245))


def motif_prompts(draw, layer):
    for i in range(8):
        col=i%2; row=i//2
        x=900+col*270; y=185+row*145
        box=(x,y,x+230,y+104)
        rounded(draw,box,(12,35,58,245),(*CYAN,95),2,20)
        dot_colour = GOLD if i in (0, 7) else CYAN
        draw.ellipse((x+24,y+28,x+64,y+68), fill=(*dot_colour,235))
        draw.line((x+82,y+36,x+195,y+36),fill=(*WHITE,190),width=8)
        draw.line((x+82,y+60,x+165,y+60),fill=(*MUTED,150),width=6)
    glow_dot(layer,(1425,720),GOLD,16)
    draw.line((1015,705,1425,720), fill=(*GOLD,130), width=4)


def motif_civil(draw, layer):
    rounded(draw,(915,170,1325,690),(12,33,54,250),(*CYAN,110),3,28)
    draw.rectangle((965,235,1275,255),fill=(*WHITE,210))
    for y,w in [(305,250),(355,285),(405,220),(520,260),(570,180)]:
        draw.rounded_rectangle((965,y,965+w,y+12),radius=6,fill=(*MUTED,140))
    draw.ellipse((1125,428,1255,558),fill=(*TEAL,230),outline=(*WHITE,180),width=3)
    draw.line((1160,493,1195,525), fill=(*WHITE,245), width=12)
    draw.line((1195,525,1240,460), fill=(*WHITE,245), width=12)
    for p in [(965,305),(965,355),(965,405)]: glow_dot(layer,p,GOLD,8)
    draw.arc((1330,260,1510,610),80,280,fill=(*GOLD,170),width=5)


def star(draw, centre, radius, colour):
    cx, cy = centre
    points = []
    for i in range(10):
        r = radius if i % 2 == 0 else radius * 0.44
        angle = math.radians(-90 + i * 36)
        points.append((cx + r * math.cos(angle), cy + r * math.sin(angle)))
    draw.polygon(points, fill=colour)


def person(draw,x,y,s,colour):
    draw.ellipse((x-34*s,y-95*s,x+34*s,y-27*s),fill=colour)
    draw.rounded_rectangle((x-58*s,y-20*s,x+58*s,y+100*s),radius=int(36*s),fill=colour)


def motif_training(draw, layer):
    rounded(draw,(995,235,1395,535),(12,36,59,245),(*CYAN,120),3,26)
    draw.line((1050,475,1320,475),fill=(*MUTED,120),width=8)
    draw.line((1050,420,1240,420),fill=(*CYAN,210),width=12)
    draw.line((1050,365,1295,365),fill=(*GOLD,210),width=12)
    draw.ellipse((1305,310,1360,365),fill=(*WHITE,230))
    person(draw,950,650,0.85,(*TEAL,235)); person(draw,1195,695,0.95,(*GOLD,235)); person(draw,1450,650,0.85,(*CYAN,235))
    for p in [(950,560),(1195,585),(1450,560)]: glow_dot(layer,p,CYAN,10)


def motif_workflow(draw, layer):
    boxes=[(875,330,1070,470),(1170,205,1390,345),(1170,515,1390,655)]
    for i,b in enumerate(boxes):
        rounded(draw,b,(12,35,58,245),((*GOLD,180) if i==0 else (*CYAN,120)),3,24)
        x1,y1,x2,y2=b
        dot_colour = GOLD if i == 0 else CYAN
        draw.ellipse((x1+24,y1+30,x1+70,y1+76),fill=(*dot_colour,230))
        draw.line((x1+90,y1+42,x2-25,y1+42),fill=(*WHITE,180),width=8)
        draw.line((x1+90,y1+72,x2-60,y1+72),fill=(*MUTED,130),width=6)
    draw.line((1070,400,1130,400,1130,275,1170,275),fill=(*CYAN,180),width=5)
    draw.line((1070,400,1130,400,1130,585,1170,585),fill=(*CYAN,180),width=5)
    glow_dot(layer,(1130,400),GOLD,13)
    draw.ellipse((1117,387,1143,413),fill=(*WHITE,240))


def motif_messages(draw, layer):
    rounded(draw,(850,205,1225,390),(14,42,65,245),(*CYAN,100),2,34)
    draw.polygon([(940,390),(995,390),(955,445)],fill=(14,42,65,245))
    for y,w in [(265,265),(315,190)]:
        line_colour = WHITE if y == 265 else MUTED
        draw.rounded_rectangle((905,y,905+w,y+14),radius=7,fill=(*line_colour,180))
    rounded(draw,(1090,450,1475,635),(19,54,70,245),(*GOLD,130),2,34)
    draw.polygon([(1320,635),(1375,635),(1405,685)],fill=(19,54,70,245))
    for y,w in [(510,270),(560,205)]:
        line_colour = WHITE if y == 510 else MUTED
        draw.rounded_rectangle((1145,y,1145+w,y+14),radius=7,fill=(*line_colour,180))
    draw.line((1040,420,1195,450),fill=(*GOLD,160),width=5)
    glow_dot(layer,(1060,425),GOLD,13)
    draw.ellipse((1036,401,1084,449),fill=(*GOLD,240))


def motif_chatbot(draw, layer):
    rounded(draw,(865,175,1470,690),(9,27,47,255),(*CYAN,130),4,34)
    draw.rectangle((905,225,1430,590),fill=(16,42,64,255))
    rounded(draw,(960,285,1235,380),(24,66,84,255),None,1,24)
    rounded(draw,(1110,420,1370,515),(38,48,67,255),None,1,24)
    for x,y,c in [(1000,630,TEAL),(1170,630,GOLD),(1340,630,CYAN)]:
        glow_dot(layer,(x,y),c,10); draw.ellipse((x-16,y-16,x+16,y+16),fill=(*c,245))
    draw.line((1000,600,1000,550,1170,550,1170,600),fill=(*CYAN,120),width=4)
    draw.line((1170,550,1340,550,1340,600),fill=(*CYAN,120),width=4)


def motif_service(draw, layer):
    rounded(draw,(875,220,1125,620),(12,34,56,245),(*CYAN,110),3,28)
    draw.ellipse((955,280,1045,370),fill=(*TEAL,225))
    for y,w in [(420,150),(470,185),(520,120)]:
        line_colour = WHITE if y == 420 else MUTED
        draw.rounded_rectangle((925,y,925+w,y+12),radius=6,fill=(*line_colour,150))
    draw.line((1125,420,1280,420),fill=(*GOLD,180),width=6)
    glow_dot(layer,(1270,420),GOLD,16)
    rounded(draw,(1270,290,1500,550),(22,48,64,245),(*GOLD,140),3,34)
    draw.ellipse((1340,340,1430,430),fill=(*GOLD,230))
    draw.arc((1320,410,1450,520),200,340,fill=(*WHITE,220),width=12)

def motif_region(draw, layer):
    outline=[(905,215),(1090,168),(1292,200),(1424,300),(1466,470),(1386,640),(1180,718),(1000,662),(898,500),(872,352)]
    draw.polygon(outline,fill=(12,35,58,225))
    draw.line(outline+[outline[0]],fill=(*CYAN,150),width=3)
    draw.line((898,470,1030,508,1152,470,1292,522,1424,494),fill=(*TEAL,190),width=6)
    rounded(draw,(1136,258,1336,392),(19,54,70,248),(*GOLD,175),3,22)
    for x in range(1164,1310,34):
        draw.rounded_rectangle((x,290,x+22,360),radius=6,fill=(*GOLD,185))
    for box in [(902,548,1058,662),(1214,556,1370,670)]:
        rounded(draw,box,(12,35,58,248),(*CYAN,135),2,20)
        x1,y1,x2,_=box
        draw.ellipse((x1+20,y1+22,x1+58,y1+60),fill=(*TEAL,225))
        draw.rounded_rectangle((x1+20,y1+76,x2-32,y1+88),radius=6,fill=(*MUTED,150))
    draw.line((1180,392,1180,470,980,470,980,548),fill=(*CYAN,160),width=4)
    draw.line((1290,392,1290,556),fill=(*CYAN,160),width=4)
    for p in [(1090,232),(1400,392),(1116,700),(930,392)]:
        glow_dot(layer,p,CYAN,10)
        draw.ellipse((p[0]-10,p[1]-10,p[0]+10,p[1]+10),fill=(*WHITE,242))
    glow_dot(layer,(1236,258),GOLD,14)


def motif_aisearch(draw, layer):
    rounded(draw,(862,180,1476,600),(9,27,47,252),(*CYAN,130),4,30)
    draw.rounded_rectangle((912,232,1186,254),radius=11,fill=(*WHITE,205))
    draw.rounded_rectangle((912,278,1058,294),radius=8,fill=(*CYAN,180))
    for y,w in [(324,486),(360,404),(396,288)]:
        draw.rounded_rectangle((912,y,912+w,y+14),radius=7,fill=(*MUTED,150))
    rounded(draw,(912,432,1424,552),(19,54,70,250),(*GOLD,165),3,22)
    draw.ellipse((950,462,1006,518),fill=(*TEAL,235))
    draw.rounded_rectangle((1032,462,1290,480),radius=9,fill=(*WHITE,215))
    for i in range(5):
        star(draw,(1045+i*42,517),15,(*GOLD,235))
    draw.line((912,610,1476,610),fill=(*CYAN,70),width=2)
    pin=(1372,676)
    draw.ellipse((pin[0]-52,pin[1]-92,pin[0]+52,pin[1]+12),fill=(*CYAN,235))
    draw.polygon([(pin[0]-30,pin[1]-4),(pin[0]+30,pin[1]-4),(pin[0],pin[1]+62)],fill=(*CYAN,235))
    draw.ellipse((pin[0]-20,pin[1]-60,pin[0]+20,pin[1]-20),fill=(9,27,47,255))
    glow_dot(layer,(pin[0],pin[1]-40),GOLD,12)
    for x,y in [(930,676),(1050,706),(1170,668)]:
        draw.rounded_rectangle((x,y,x+96,y+14),radius=7,fill=(*MUTED,120))


def motif_courses(draw, layer):
    rounded(draw,(862,172,1478,604),(12,33,54,250),(*CYAN,115),3,26)
    labels=[(898,220,1078,556,TEAL),(1080,220,1260,556,CYAN),(1262,220,1442,556,GOLD)]
    for i,(x1,y1,x2,y2,colour) in enumerate(labels):
        rounded(draw,(x1+12,y1+12,x2-12,y2-12),(11,30,52,250),(*colour,165),3,22)
        draw.rounded_rectangle((x1+34,y1+44,x2-34,y1+70),radius=13,fill=(*colour,225))
        for row,w in [(0,0.72),(1,0.56),(2,0.40)]:
            top=y1+118+row*44
            draw.rounded_rectangle((x1+34,top,x1+34+int((x2-x1-68)*w),top+13),radius=7,fill=(*MUTED,145))
        cx,cy=x1+((x2-x1)//2),y2-64
        if i==0:
            draw.line((cx-30,cy,cx-6,cy+22),fill=(*WHITE,235),width=11)
            draw.line((cx-6,cy+22,cx+34,cy-32),fill=(*WHITE,235),width=11)
        else:
            draw.ellipse((cx-22,cy-22,cx+22,cy+22),fill=(*colour,215))
        glow_dot(layer,((x1+x2)//2,y1+26),colour,9)
    person(draw,940,760,0.78,(*CYAN,235))
    draw.line((994,700,1080,634),fill=(*GOLD,165),width=5)
    glow_dot(layer,(1080,634),GOLD,13)


def motif_grounding(draw, layer):
    rounded(draw,(872,176,1466,436),(9,27,47,252),(*CYAN,140),4,28)
    draw.rounded_rectangle((916,214,1190,236),radius=11,fill=(*WHITE,205))
    for y,w in [(268,470),(304,392)]:
        draw.rounded_rectangle((916,y,916+w,y+14),radius=7,fill=(*MUTED,150))
    for i in range(3):
        x=916+i*178
        rounded(draw,(x,352,x+150,398),(19,54,70,250),(*CYAN,175),2,22)
        draw.rectangle((x+18,366,x+40,384),fill=(*CYAN,235))
        draw.rounded_rectangle((x+52,370,x+130,380),radius=5,fill=(*WHITE,205))
        glow_dot(layer,(x+29,375),CYAN,7)
    rounded(draw,(872,476,1466,700),(26,18,8,250),(*GOLD,150),3,28)
    draw.rounded_rectangle((916,514,1150,536),radius=11,fill=(*WHITE,180))
    for y,w in [(568,440),(604,360)]:
        draw.rounded_rectangle((916,y,916+w,y+14),radius=7,fill=(*MUTED,130))
    tx,ty=1330,600
    draw.polygon([(tx,ty-46),(tx-52,ty+40),(tx+52,ty+40)],fill=(*GOLD,235))
    draw.rectangle((tx-6,ty-24,tx+6,ty+10),fill=(26,18,8,255))
    draw.ellipse((tx-7,ty+18,tx+7,ty+32),fill=(26,18,8,255))
    glow_dot(layer,(tx,ty-46),GOLD,10)


MOTIFS={"network":motif_network,"prompts":motif_prompts,"civil":motif_civil,"training":motif_training,"workflow":motif_workflow,"messages":motif_messages,"chatbot":motif_chatbot,"service":motif_service,"region":motif_region,"aisearch":motif_aisearch,"courses":motif_courses,"grounding":motif_grounding}


def make_image(index, slug, category, line1, line2, motif):
    base=gradient_background(index+17).convert("RGBA")
    draw=ImageDraw.Draw(base,"RGBA")
    add_grid(draw)
    # Framing and category
    draw.rounded_rectangle((90,90,410,142),radius=26,fill=(*TEAL,34),outline=(*CYAN,100),width=2)
    draw.text((120,103),category,font=font(22,True),fill=(*CYAN,255))
    # Editorial headline
    draw.text((90,245),line1,font=fit_font(draw,line1,72,700,True),fill=WHITE)
    draw.text((90,340),line2,font=fit_font(draw,line2,52,700,False),fill=(*GOLD,255))
    draw.line((90,445,620,445),fill=(*CYAN,110),width=3)
    draw.text((90,492),"PRACTICAL AI. CLEARLY EXPLAINED.",font=font(22,True),fill=(*MUTED,230))
    draw.text((90,735),"AI VISION CONSULTING",font=font(25,True),fill=(*WHITE,230))
    draw.ellipse((90,790,104,804),fill=(*GOLD,255))
    draw.line((124,797,285,797),fill=(*CYAN,125),width=2)
    MOTIFS[motif](draw,base)
    # subtle vignette and finish
    vign=Image.new("L",(W,H),0); vd=ImageDraw.Draw(vign)
    vd.ellipse((-150,-220,W+150,H+220),fill=220)
    vign=vign.filter(ImageFilter.GaussianBlur(120))
    shade=Image.new("RGBA",(W,H),(0,0,0,0)); shade.putalpha(Image.eval(vign,lambda p:255-p))
    base=Image.alpha_composite(base,shade)
    path=OUT/f"{slug}.png"
    base.convert("RGB").save(path,"PNG",optimize=True)
    print(path, path.stat().st_size)

if __name__ == "__main__":
    # Pass slugs to regenerate a subset. Existing artwork is left untouched so a
    # different host font never silently rewrites the published images.
    wanted = set(sys.argv[1:])
    for idx, record in enumerate(ARTICLES):
        if wanted and record[0] not in wanted:
            continue
        make_image(idx, *record)
