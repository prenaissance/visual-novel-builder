import useNovel from "../novel/useNovel";

export default function Web() {
  const { panel, novel } = useNovel();
  return (
    <div>
      <h1>Web</h1>
      <button onClick={() => novel.transition("end")}>End</button>
      <pre>{JSON.stringify(panel, null, 2)}</pre>
    </div>
  );
}

