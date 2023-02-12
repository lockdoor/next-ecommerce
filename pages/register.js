import LayoutMain from "@/components/layout/layoutMain";
import Jumbotron from "@/components/jumbotron";
import FromRegister from "@/components/fromRegister";
export default function Home() {
  return (
    <LayoutMain page={"register"}>
      <main>
        <Jumbotron 
          title={'REGISTER PAGE'}
          subTitle={'Please Register before Login'}
        />
        <FromRegister />
      </main>
    </LayoutMain>
  );
}