"use client";
import { useState } from "react";
import { videoProjects, videoClips } from "@/demo/modules/creative";
import {
  ModuleFrame,
  Panel,
  Catalog,
  Editor,
  Select,
  Disconnected,
  Tabs,
} from "../shared/module-ui";
import { SampleArt } from "../shared/sample-art";
export function VideoStudio() {
  const [project, setProject] = useState("film-1");
  const [clip, setClip] = useState<string>("clip-1");
  const [prompt, setPrompt] = useState("");
  const [format, setFormat] = useState("16:9");
  const [duration, setDuration] = useState("18 seconds");
  const [caption, setCaption] = useState("A quieter kind of launch");
  const item = videoClips.find((c) => c.id === clip)!;
  return (
    <ModuleFrame
      slug="video-studio"
      tagline="Plan the rhythm before the first frame is made."
      related={["image-studio", "marketing"]}
    >
      <div className="tool-split">
        <div className="tool-stack">
          <Panel title="Film concepts">
            <Catalog
              title="Video projects"
              items={videoProjects}
              selected={project}
              onSelect={setProject}
            />
            <Editor
              label="Video direction"
              value={prompt}
              onChange={setPrompt}
            />
            <div className="tool-fields">
              <Select
                label="Frame format"
                value={format}
                onChange={setFormat}
                options={["16:9", "9:16", "1:1"]}
              />
              <Select
                label="Planned duration"
                value={duration}
                onChange={setDuration}
                options={["12 seconds", "18 seconds", "30 seconds"]}
              />
            </div>
            <Disconnected action="Generate video" />
          </Panel>
          <Panel title="Media assets">
            <ul className="tool-mini-list">
              <li>Opening shape · Fixed vector placeholder</li>
              <li>Product moment · Fixed vector placeholder</li>
              <li>Audio track · Not connected</li>
            </ul>
            <Disconnected
              action="Upload media"
              reason="No file picker or cloud upload is connected."
            />
          </Panel>
        </div>
        <Panel
          title="Storyboard, not playback"
          kicker="FIXED SAMPLE / NO VIDEO FILE"
        >
          <div className="video-placeholder">
            <SampleArt
              name={item.name}
              variant={videoClips.indexOf(item)}
              palette="blue"
            />
            <span>{item.name} · Preview placeholder</span>
          </div>
          <div
            className="video-timeline"
            role="group"
            aria-label="Storyboard clips"
          >
            {videoClips.map((c) => (
              <button
                key={c.id}
                aria-pressed={clip === c.id}
                onClick={() => setClip(c.id)}
              >
                {c.name}
                <small>{c.detail}</small>
              </button>
            ))}
          </div>
          <div className="track-placeholder">
            Subtitle track · Local caption draft
          </div>
          <div className="track-placeholder">
            Audio track · Not connected, no sound
          </div>
          <Tabs
            label="Video inspection"
            items={[
              {
                id: "clip",
                label: "Clip inspector",
                content: (
                  <>
                    <h3>{item.name}</h3>
                    <p>{item.detail}. No clip is encoded, cut or rendered.</p>
                    <p>
                      Draft settings: {format} · {duration}. These do not alter
                      the fixed storyboard.
                    </p>
                  </>
                ),
              },
              {
                id: "subtitle",
                label: "Subtitles",
                content: (
                  <>
                    <Editor
                      label="Local caption draft"
                      value={caption}
                      onChange={setCaption}
                    />
                    <p className="tool-preview-copy">{caption}</p>
                    <p>
                      Preview text only; no subtitle file or timing is produced.
                    </p>
                  </>
                ),
              },
              {
                id: "audio",
                label: "Audio",
                content: (
                  <p>
                    No audio source connected. Future volume, voice and mixing
                    controls require a real media pipeline.
                  </p>
                ),
              },
            ]}
          />
          <Disconnected
            action="Export video"
            reason="Rendering, editing and encoding are not implemented."
          />
        </Panel>
      </div>
    </ModuleFrame>
  );
}
