#!/usr/bin/env python3
"""Generate original AI Vision Consulting blog artwork as 1600x900 PNG files."""
from __future__ import annotations

from pathlib import Path
import math
import random
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
FONT = "/usr/share/fonts/truetype/ubuntu/UbuntuSans[wdth,wght].ttf"
FONT_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"

ARTICLES = [
    ("what-is-ai", "AI FUNDAMENTALS", "What is AI?", "A plain-English guide", "network"),
    ("8-ai-prompts-every-job-seeker-needs-right-now", "JOB SEARCH", "8 AI prompts", "for a focused job search", "prompts"),
    ("use-ai-civil-service-application", "CIVIL SERVICE", "Use AI without", "losing your voice", "civil"),
    ("ai-training-for-employees", "AI TRAINING", "Practical AI training", "that changes how work gets done", "training"),
    ("what-to-automate-first-small-business", "SMALL BUSINESS", "What should you", "automate first?", "workflow"),
    ("whatsapp-lead-automation-small-business", "LEAD HANDLING", "Automate the routine.", "Keep judgement human.", "messages"),
    ("ai-chatbot-for-your-website", "WEBSITE CHATBOTS", "Does your website", "need an AI chatbot?", "chatbot"),
    ("how-to-start-an-ai-side-hustle", "FREELANCING", "Start with a problem.", "Build one useful service.", "service"),
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

MOTIFS={"network":motif_network,"prompts":motif_prompts,"civil":motif_civil,"training":motif_training,"workflow":motif_workflow,"messages":motif_messages,"chatbot":motif_chatbot,"service":motif_service}


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
    for idx,record in enumerate(ARTICLES):
        make_image(idx,*record)
