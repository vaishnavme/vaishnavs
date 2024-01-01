import MetaSEO from "@/components/UI/MetaSEO";

const About = () => (
  <>
    <MetaSEO
      title="Vaishnav's NoteBook"
      description="Writings about my journey as a developer, learning through the
            products I build, and life experiences."
    />

    <section className="mx-auto flex flex-col items-center text-center max-w-sm">
      <div className="relative group">
        <img
          src="avatar.svg"
          alt="avatar_present: Vaishnav Chandurkar"
          width={150}
          height={150}
        />
        <div className="bg-yellow-100/50 h-24 w-56 absolute bottom-0 -left-6 -rotate-45 group-hover:rotate-90 group-hover:bg-orange-300/70 -z-10 rounded-md transition-all duration-700 ease-in-out" />
        <div className="bg-orange-300/70 h-24 w-56 absolute bottom-0 -left-6 -rotate-45 group-hover:rotate-90 group-hover:bg-yellow-100/50 -z-10 rounded-md transition-all duration-700 ease-in-out group-hover:left-4" />
      </div>

      <article className="font-display text-sm leading-6">
        hi, i'm Vaishnav, a Full Stack Engineer at{" "}
        <a
          href="https://peerlist.io"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-green-600 underline-offset-1 transition-all duration-200 decoration-orange-200"
        >
          Peerlist
        </a>
        . <br /> I love crafting digital experiences and bringing ideas to life
        through code.
      </article>
    </section>
  </>
);

export default About;
