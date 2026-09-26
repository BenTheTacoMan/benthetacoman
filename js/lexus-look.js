// dresses the lexus model like ben's car: navy clearcoat paint and twisted 10-double-spoke wheels
export function styleLexus(THREE, root) {
  // paint: a deep navy that still reads as blue, with a clear coat on top
  root.traverse((m) => {
    if (!m.isMesh || m.material.name !== "Paint") return;
    m.material = new THREE.MeshPhysicalMaterial({
      name: "Paint",
      color: new THREE.Color().setRGB(0.02, 0.036, 0.115),
      metalness: 0.35,
      roughness: 0.32,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
    });
  });

  const face = new THREE.MeshStandardMaterial({ color: 0x7a7d82, metalness: 0.8, roughness: 0.3 }); // machined spoke faces
  const gun = new THREE.MeshStandardMaterial({ color: 0x34373c, metalness: 0.75, roughness: 0.4 }); // gunmetal sides and barrel
  const dark = new THREE.MeshStandardMaterial({ color: 0x131416, metalness: 0.4, roughness: 0.6 }); // inside the wheel

  for (const name of ["FR_1", "FL_2", "RL_3", "RR_4"]) {
    const wheel = root.getObjectByName(name);
    if (!wheel) continue;
    // the old rim is the chrome mesh inside the wheel; measure it, then hide it
    let old;
    wheel.traverse((m) => m.isMesh && m.material.name !== "Tyres" && (old = m));
    if (!old) continue;
    old.updateMatrix();
    old.geometry.computeBoundingBox();
    const bb = old.geometry.boundingBox.clone().applyMatrix4(old.matrix);
    const R = Math.max(bb.max.y - bb.min.y, bb.max.z - bb.min.z) / 2;
    const cx = (bb.min.x + bb.max.x) / 2, cy = (bb.min.y + bb.max.y) / 2, cz = (bb.min.z + bb.max.z) / 2;
    const out = wheel.position.x >= 0 ? 1 : -1; // which way the wheel faces
    const faceX = out > 0 ? bb.max.x : bb.min.x;
    old.visible = false;

    const rim = new THREE.Group();
    rim.position.set(0, cy, cz);
    // built in the y-z plane facing +x, then flipped for the other side
    const g = new THREE.Group();
    g.scale.x = out;
    g.position.x = faceX;
    rim.add(g);

    const depth = R * 0.12, r0 = R * 0.24, r1 = R * 0.94;
    // barrel and back: dark, so the gaps between spokes read as depth
    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(R * 0.96, R * 0.96, R * 0.9, 48, 1, true), dark);
    barrel.rotation.z = Math.PI / 2; barrel.position.x = -R * 0.45; barrel.material.side = THREE.DoubleSide; g.add(barrel);
    const back = new THREE.Mesh(new THREE.CircleGeometry(R * 0.95, 48), dark);
    back.rotation.y = -Math.PI / 2; back.position.x = -R * 0.55; g.add(back);
    // brake rotor
    const rotor = new THREE.Mesh(new THREE.CylinderGeometry(R * 0.7, R * 0.7, R * 0.08, 40), new THREE.MeshStandardMaterial({ color: 0x55585c, metalness: 0.9, roughness: 0.45 }));
    rotor.rotation.z = Math.PI / 2; rotor.position.x = -R * 0.35; g.add(rotor);
    // the lip
    const lip = new THREE.Mesh(new THREE.TorusGeometry(R * 0.95, R * 0.035, 10, 64), gun);
    lip.rotation.y = Math.PI / 2; lip.position.x = -R * 0.02; g.add(lip);

    // ten pairs of thin spokes, each curving as it runs out to the lip
    const spoke = (a0, twist) => {
      const s = new THREE.Shape();
      const w0 = R * 0.05, w1 = R * 0.032, n = 10;
      const pts = [], back2 = [];
      for (let i = 0; i <= n; i++) {
        const t = i / n, r = r0 + (r1 - r0) * t, a = a0 + twist * t * t, w = w0 + (w1 - w0) * t;
        const cxp = Math.cos(a) * r, cyp = Math.sin(a) * r, nx = -Math.sin(a), ny = Math.cos(a);
        pts.push([cxp + nx * w, cyp + ny * w]); back2.push([cxp - nx * w, cyp - ny * w]);
      }
      [...pts, ...back2.reverse()].forEach(([x, y], i) => (i ? s.lineTo(x, y) : s.moveTo(x, y)));
      const geo = new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: true, bevelThickness: depth * 0.12, bevelSize: R * 0.006, bevelSegments: 2, curveSegments: 1 });
      const m = new THREE.Mesh(geo, [face, gun]);
      // extrude runs along z; turn it so the spoke lies in the wheel's y-z plane, face toward +x
      m.rotation.y = Math.PI / 2;
      m.position.x = -depth - R * 0.02;
      // spokes dish inward toward the hub
      return m;
    };
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2;
      g.add(spoke(a - 0.045, 0.08), spoke(a + 0.045, 0.24)); // each pair splits as it runs out
    }
    // hub and centre cap
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(r0 * 1.05, r0 * 1.2, depth * 1.4, 32), gun);
    hub.rotation.z = Math.PI / 2; hub.position.x = -depth * 0.6; g.add(hub);
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(r0 * 0.62, r0 * 0.62, depth * 0.5, 32), face);
    cap.rotation.z = Math.PI / 2; cap.position.x = depth * 0.15; g.add(cap);

    rim.traverse((m) => m.isMesh && (m.castShadow = m.receiveShadow = true));
    old.parent.add(rim);
  }
}
