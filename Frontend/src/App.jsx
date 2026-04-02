import React, { useState } from "react";
import axios from "axios";

function App() {
  const [urls, setUrls] = useState([]);
  const [index, setIndex] = useState(0);
  const [sheetUrl, setSheetUrl] = useState("");

  const handleUpload = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    try {
      const res = await axios.post(
        "https://website-navigator-delta.vercel.app/api/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      setUrls(res.data.data.urls);
      setIndex(0);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSheet = async () => {
    try {
      const res = await axios.post(
        "https://website-navigator-delta.vercel.app/api/sheet",
        {
          url: sheetUrl,
        },
      );

      setUrls(res.data.data.urls);
      setIndex(0);
    } catch (err) {
      console.log(err);
    }
  };

  const next = () => {
    if (index < urls.length - 1) {
      setIndex(index + 1);
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <div style={{ textAlign: "center" }} className="container-fluid">
      <div class="d-flex flex-column align-items-center gap-3">
        <nav>
          <h1>Website Navigator</h1>
        </nav>

        <section>
          <input
            class="form-control"
            type="file"
            onChange={handleUpload}
            border-info
          />
        </section>

        <section className="d-flex flex-column flex-sm-row">
          <div>
            <input
              class="form-control border-info"
              type="text"
              placeholder="Paste Google Sheet URL"
              value={sheetUrl}
              onChange={(e) => setSheetUrl(e.target.value)}
            />
          </div>
          <div>
            <button
              onClick={handleSheet}
              className="btn btn-outline-secondary bg-info text-dark border-info-subtle"
            >
              Upload Sheet
            </button>
          </div>
        </section>
      </div>

      {urls.length > 0 && (
        <>
          <div class="mt-3">
            <button
              onClick={prev}
              disabled={index === 0}
              class="btn btn-outline-secondary fw-bold"
            >
              Prev
            </button>

            <span style={{ margin: "0 10px" }}>
              {index + 1} / {urls.length}
            </span>

            <button
              onClick={next}
              disabled={index === urls.length - 1}
              class="btn btn-outline-secondary fw-bold"
            >
              Next
            </button>
          </div>

          <div class="card mt-3 ">
            <iframe
              src={urls[index]}
              title="website"
              width="100%"
              height="500px"
            />
          </div>

          <p class="mt-3">
            If not visible:{" "}
            <a href={urls[index]} target="_blank" rel="noreferrer">
              Open in new tab
            </a>
          </p>
        </>
      )}
    </div>
  );
}

export default App;
