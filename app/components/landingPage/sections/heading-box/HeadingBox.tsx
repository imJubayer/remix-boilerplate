interface HeadingBoxProps{
    title: string;
}

export default function HeadingBox({title}:HeadingBoxProps) {
  return (
    <div className="cm_title_box">
      <div className="title_box">
        <h2>{title}</h2>
      </div>
    </div>
  );
}
