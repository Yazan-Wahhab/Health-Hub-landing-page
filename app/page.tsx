import Logo3D from "./components/logo";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 p-10 bg-background h-screen">
      <div className="text-text-main text-3xl font-bold">
        Text Main
      </div>
      
      <div className="text-primary text-3xl font-bold">
        Primary Blue
      </div>
      
      <div className="text-secondary text-3xl font-bold">
        Secondary Green
      </div>
      <Logo3D />
    </div>
  );
}