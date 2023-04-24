import rufina from "@/components/UIElements/Font";
import MetaSEO from "@/components/UIElements/MetaSEO";

const About = () => {
  return (
    <>
      <MetaSEO
        title="Blog | Vaishnav Chandurkar"
        description="Software Engineer @Peerlist"
        keywords="Engineer, Frontend Developer, Developer"
        ogImage="/images/vaishnav_og.png"
      />

      <div className="mt-20">
        <h1 className={`${rufina.className} text-3xl pb-10 mb-10`}>About me</h1>
        ✍️ writing in progress
      </div>
    </>
  );
};

export default About;
