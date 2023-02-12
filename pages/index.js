import LayoutMain from "@/components/layout/layoutMain";
import Jumbotron from "@/components/jumbotron";
export default function Home() {
  return (
    <LayoutMain page={"home"}>
      <main>
        <Jumbotron 
          title={'HOME PAGE'}
          subTitle={'Wellcome to my shop'}
        />
      </main>
    </LayoutMain>
  );
}
