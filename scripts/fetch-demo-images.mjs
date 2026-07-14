// Download themed demo images from Unsplash into public/img/<pack>/
// Usage: node scripts/fetch-demo-images.mjs [--force]
import sharp from "sharp";
import { mkdirSync, existsSync } from "fs";
import { writeFile } from "fs/promises";

const FORCE = process.argv.includes("--force");

// pack -> { name: unsplashPhotoId }  (name becomes public/img/<pack>/<name>.jpg)
const PACKS = {
  hotel: {
    "room-deluxe": "1566073771259-6a8506099945",
    "room-standard": "1590490360182-c33d57733427",
    "room-suite": "1578683010236-d716f9a3f461",
    pool: "1571896349842-33c89424de2d",
    exterior: "1520250497591-112f2f40a3f4",
    breakfast: "1533089860892-a7c6f0a88666",
    bathroom: "1584622650111-993a426fbf0a",
    lobby: "1551882547-ff40c63fe5fa",
  },
  pets: {
    "dog-1": "1552053831-71594a27632d",
    "dog-2": "1543466835-00a7907e9de1",
    "cat-1": "1514888286974-6c03e2ca1dba",
    "cat-2": "1573865526739-10659fec78a5",
    "dog-cat": "1450778869180-41d0601e046e",
    walk: "1548199973-03cce0bbc87b",
    "vet-1": "1628009368231-7bb7cfcb0def",
    "vet-2": "1576201836106-db1758fd1c97",
  },
  gym: {
    hero: "1534438327276-14e5300c3a48",
    weights: "1517836357463-d25dfeac3438",
    barbell: "1518611012118-696072aa579a",
    yoga: "1544367567-0f2fcb009e0b",
    cardio: "1538805060514-97d9cc17730c",
    boxing: "1549719386-74dfcbf7dbed",
    workout: "1583454110551-21f2fa2afe61",
    trainer: "1571731956672-f2b94d7dd0cb",
  },
  court: {
    "badminton-1": "1626224583764-f87db24ac4ea",
    "badminton-2": "1613918431703-aa50889e3be9",
    indoor: "1519861531473-9200262188bf",
    tennis: "1554068865-24cecd4e34b8",
    volleyball: "1547347298-4074fc3086f0",
  },
  cars: {
    "car-red": "1552519507-da3b142c6e3d",
    porsche: "1503376780353-7e6692767b70",
    mustang: "1494976388531-d1058494cdd8",
    classic: "1583121274602-3e2820c69888",
    interior: "1549317661-bd32c8ce0db2",
    wash: "1558618666-fcd25c85cd64",
    polish: "1607860108855-64acf2078ed9",
  },
  laundry: {
    machines: "1545173168-9f1947eebb7f",
    towels: "1489274495757-95c7c837b101",
    rack: "1489987707025-afc232f7bdaf",
    shirt: "1521572163474-6864f9cf17ab",
    sneaker: "1560769629-975ec94e6a86",
    bedding: "1522771739844-6a9f6d5f14af",
  },
  cowork: {
    "office-1": "1497366216548-37526070297c",
    "office-2": "1497366811353-6870744d04b2",
    meeting: "1524758631624-e2822e304c36",
    team: "1556761175-5973dc0f32e7",
  },
  education: {
    "class-1": "1509062522246-3755977927d7",
    "class-2": "1503676260728-1c00da094a0b",
    study: "1522202176988-66273c2fd55f",
    books: "1456513080510-7bf3a84b82f8",
    "tutor-f1": "1573496359142-b8d87734a5a2",
    "tutor-m1": "1560250097-0b93528c311a",
    "tutor-f2": "1580489944761-15a19d654956",
    "tutor-m2": "1507003211169-0a1dd7228f2d",
  },
  medical: {
    "doctor-1": "1612349317150-e413f6a5b16d",
    team: "1519494026892-80bbd2d6fd0d",
    steth: "1576091160399-112ba8d25d1d",
    dental: "1606811841689-23dfddce3e95",
    physio: "1571019613454-1cb2f99b2d8b",
    hospital: "1538108149393-fbbd81895907",
  },
  venue: {
    ballroom: "1519167758481-83f550bb49b3",
    dinner: "1464366400600-7168b8af9bc3",
    catering: "1511578314322-379afb476865",
    party: "1492684223066-81342ee5ff30",
    conference: "1540575467063-178a50c2df87",
    wedding: "1505236858219-8359eb29e329",
  },
  kitchen: {
    "chef-1": "1556910103-1c02745aae4d",
    plating: "1600565193348-f74bd3c7ccdf",
    team: "1581299894007-aaa50297cf16",
    pass: "1414235077428-338989a2e8c0",
  },
  delivery: {
    boxes: "1566576721346-d4a3b4eaeb55",
    courier: "1526367790999-0150786686a2",
    van: "1601584115197-04ecc0da31d7",
    warehouse: "1553413077-190dd305871c",
  },
  fleet: {
    truck: "1519003722824-194d4455a60c",
    containers: "1494412651409-8963ce7935a7",
    mechanic: "1487754180451-c456f719a1fc",
  },
  ai: {
    abstract: "1620712943543-bcc4688e7485",
    circuit: "1518770660439-4636190af475",
    code: "1555949963-aa79dcee981c",
    server: "1558494949-ef010cbdcc31",
  },
};

const ok = [];
const fail = [];

for (const [pack, files] of Object.entries(PACKS)) {
  const dir = `public/img/${pack}`;
  mkdirSync(dir, { recursive: true });
  for (const [name, id] of Object.entries(files)) {
    const out = `${dir}/${name}.jpg`;
    if (!FORCE && existsSync(out)) {
      ok.push(out + " (cached)");
      continue;
    }
    const url = `https://images.unsplash.com/photo-${id}?w=1600&q=80&fm=jpg&fit=max`;
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(30000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      const img = sharp(buf).rotate();
      const meta = await img.metadata();
      if (!meta.width || meta.width < 400) throw new Error("too small");
      const outBuf = await img
        .resize({ width: 1400, withoutEnlargement: true })
        .jpeg({ quality: 76, progressive: true, mozjpeg: true })
        .toBuffer();
      await writeFile(out, outBuf);
      ok.push(`${out} ${(outBuf.length / 1024).toFixed(0)}KB`);
      console.log("ok  ", out);
    } catch (e) {
      fail.push(`${pack}/${name} (${id}): ${e.message}`);
      console.log("FAIL", pack + "/" + name, e.message);
    }
  }
}

console.log(`\ndone: ${ok.length} ok, ${fail.length} failed`);
if (fail.length) {
  console.log("failures:");
  for (const f of fail) console.log(" -", f);
}
