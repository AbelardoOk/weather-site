import Image from "next/image";

export default function Home() {
  return (
    <main className="flex h-screen flex-col justify-center">
      <div className="flex flex-row justify-around">
        <div className="flex flex-col justify-between py-8">
          <div className="text-left text-lg text-slate-800">
            <h2 className="text-2xl font-medium">Aquidauana - Brasil</h2>
            <h3 className="font-medium">21 de Agosto, Segunda-feira</h3>
          </div>

          <div className="flex flex-col gap-4">
            <div className="gap flex flex-row items-end">
              <h1 className="text-9xl font-extralight text-slate-800">23º</h1>
              <h2 className="text-4xl font-extralight text-slate-600">
                mostly cloudy
              </h2>
            </div>

            <div className="flex flex-row justify-around rounded-2xl border-2 border-slate-500 px-4 py-2 text-lg font-light text-slate-700">
              <p>16º max</p>
              <p>32º min</p>
            </div>
          </div>
        </div>

        <div>
          <Image
            className="h-fit w-64 rounded-2xl shadow-xl"
            src={"/Sun.png"}
            alt=""
            height={1334}
            width={750}
          />
        </div>
      </div>
    </main>
  );
}
