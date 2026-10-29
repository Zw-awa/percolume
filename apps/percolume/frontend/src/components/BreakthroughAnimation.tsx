export function BreakthroughAnimation({ visible }: { visible: boolean }) {
  return visible ? <div className="breakthrough-animation" role="status" aria-live="polite"><span className="breakthrough-mark" aria-hidden="true" />目标路径已贯通</div> : null;
}
