import Header from "../header";
import { TurmaProvider } from "../context/TurmaContext";
import DashInternoTela from "../dashInternoTela";


function TelaEspecifica() {

  return (
    <TurmaProvider>
      <div>
        <Header />
        <div>
          <DashInternoTela />
        </div>
      </div>
    </TurmaProvider>
  );
}

export default TelaEspecifica;
