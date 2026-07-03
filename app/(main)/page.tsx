import List from "../../components/List";
import Description from "../../components/Description";

export default function Home() {
  return (
    <>
      <section className="flex flex-col flex-end overflow-y-auto gap-2 w-full">
        <h2 className="text-xl mb-4 font-semibold">
          Conheça as nossas aplicações e saiba o que elas podem fazer por você
        </h2>
        <hr className="border-gray-600" ></hr>
        <section className="flex flex-col gap-2">
          <Description />
        </section>
        <List />
      </section>
    </>
  );
}
