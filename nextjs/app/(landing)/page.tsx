import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section id="hero" className="hero-beautiful">
        <div className="container position-relative z-index-2">
          <div className="row justify-content-center text-center">
            <div
              className="col-lg-12 d-flex flex-column justify-content-center align-items-center"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <div className="hero-content-frame">
                <h1>
                  Kept<span className="gradient-text">Carbon</span>
                </h1>
                <p className="hero-subtitle-th">
                  <span>แพลตฟอร์มภูมิสารสนเทศและปัญญาประดิษฐ์</span>
                  <span>เพื่อการจัดการสวนยางพาราอย่างยืดหยุ่น</span>
                  <span>ต่อการเปลี่ยนแปลงสภาพภูมิอากาศ</span>
                </p>
                <p className="hero-subtitle-en">
                  <span>A GeoAI-Driven Platform for Climate-Resilient</span>{" "}
                  <span>Rubber Plantation Management</span>
                </p>

                <div className="hero-actions" style={{ marginTop: 32 }}>
                  <Link href="/map-draw" className="btn-hx-primary">
                    <i className="bi bi-calculator"></i>
                    ประเมินคาร์บอน
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats & Partners Section */}
      <section id="stats" className="project-about-section" style={{ scrollMarginTop: 80 }}>
        <div className="container">
          {/* Impact in Numbers */}
          <div className="impact-numbers" data-aos="fade-up" data-aos-delay="200">
            <div className="impact-header">
              <div className="project-tag">
                <i className="bi bi-graph-up-arrow"></i> ผลลัพธ์เชิงตัวเลข
              </div>
              <h3 className="impact-title">
                สถิติของ<span>แพลตฟอร์ม</span>
              </h3>
            </div>

            <div className="impact-grid">
              {[
                {
                  icon: "bi-geo-alt-fill",
                  value: "120,000+",
                  label: "ไร่ พื้นที่สวนยางที่วิเคราะห์",
                },
                {
                  icon: "bi-grid-3x3-gap-fill",
                  value: "8,500+",
                  label: "แปลงที่ประเมินคาร์บอน",
                },
                {
                  icon: "bi-bullseye",
                  value: "92%",
                  label: "ความแม่นยำของแบบจำลอง",
                },
                {
                  icon: "bi-cloud-check-fill",
                  value: "45,000+",
                  label: "tCO₂e ศักยภาพคาร์บอนเครดิต",
                },
              ].map((s, i) => (
                <div className="impact-item" data-aos="zoom-in" data-aos-delay={250 + i * 100} key={s.label}>
                  <div className="impact-icon"><i className={`bi ${s.icon}`}></i></div>
                  <div className="impact-number">{s.value}</div>
                  <div className="impact-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="partners-section" data-aos="fade-up" data-aos-delay="400">
            <div className="partners-label">หน่วยงานร่วมโครงการ</div>
            <div className="partners-grid">
              {[1, 2, 3, 4].map((n) => (
                <div className="partner-logo-card" key={n}>
                  <img src={`/assets/img/clients/client-${n}.png`} alt={`Partner ${n}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
