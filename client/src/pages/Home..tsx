import Feed from "../components/Feed";

const Home = () => {
  return (
    <section className="flex flex-col gap-y-2 justify-center items-center px-5 pt-10 h-min">
      <h1
        className="text-3xl font-bold bg-clip-text text-transparent 
      bg-gradient-to-r from-blue-200 to-blue-500 md:text-5xl py-2"
      >
        Discover what they think
      </h1>

      <p className="text-white text-sm md:text-base text-justify w-full md:w-[80vw] lg:w-[60vw]">
        Welcome to ThoughtBox, an innovative platform designed to empower you to
        explore and expand your thoughts. In this digital realm, ThoughtBox
        serves as your virtual canvas, inviting you to unleash your creativity,
        share your ideas, and connect with like-minded individuals. Whether
        you're an artist seeking inspiration, a writer in search of a supportive
        community, or simply someone who enjoys pondering the depths of their
        mind, ThoughtBox is the perfect space for you.
        <br></br>
        <br></br>
        With ThoughtBox, you can create and customize your personal thought
        cards, where you can jot down your musings, express your emotions, or
        capture moments of inspiration. Seamlessly organize and categorize your
        thoughts, making it effortless to navigate through your own mental
        landscape. Engage with others by sharing your thoughts publicly or
        privately, fostering meaningful conversations and sparking new
        perspectives.
      </p>
      <Feed />
    </section>
  );
};

export default Home;
