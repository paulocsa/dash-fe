import { useState } from "react";
import styles from "./ListRegistroVotos.module.css";
import { IoChevronForward, IoChevronBackOutline } from "react-icons/io5";

const dados = [
  { nome: "João", idade: 25, cidade: "São Paulo" },
  { nome: "Maria", idade: 30, cidade: "Curitiba" },
  { nome: "Lucas", idade: 22, cidade: "Belo Horizonte" },
  { nome: "Ana", idade: 28, cidade: "Rio de Janeiro" },
  { nome: "Carlos", idade: 31, cidade: "Salvador" },
  { nome: "Laura", idade: 24, cidade: "Porto Alegre" },
  { nome: "Pedro", idade: 29, cidade: "Recife" },
  { nome: "Bruna", idade: 26, cidade: "Florianópolis" },
  { nome: "Rafael", idade: 27, cidade: "Fortaleza" },
  { nome: "Isabela", idade: 23, cidade: "Manaus" },
  { nome: "Thiago", idade: 32, cidade: "Natal" },
  { nome: "Juliana", idade: 21, cidade: "Vitória" },
  { nome: "Felipe", idade: 26, cidade: "João Pessoa" },
  { nome: "Camila", idade: 28, cidade: "Campo Grande" },
  { nome: "Eduardo", idade: 33, cidade: "Belém" },
  { nome: "Aline", idade: 25, cidade: "São Luís" },
  { nome: "Bruno", idade: 27, cidade: "Teresina" },
  { nome: "Fernanda", idade: 29, cidade: "Aracaju" },
  { nome: "Igor", idade: 24, cidade: "Maceió" },
  { nome: "Tatiane", idade: 30, cidade: "Palmas" },
  { nome: "Vinícius", idade: 31, cidade: "Cuiabá" },
  { nome: "Natália", idade: 22, cidade: "Boa Vista" },
  { nome: "Gustavo", idade: 28, cidade: "Porto Velho" },
  { nome: "Patrícia", idade: 26, cidade: "Macapá" },
];

function RegistroVotos() {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 4;

  const totalPaginas = Math.ceil(dados.length / itensPorPagina);

  const paginas = Array.from({ length: totalPaginas }, (_, index) => index + 1);

  const marcaPagina = (index) => {
    if (index == paginaAtual){
      return styles.paginaAtual
    }else{
      return styles.nada
    }
  }

  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const dadosPagina = dados.slice(inicio, fim);

  const irParaAnterior = () => {
    if (paginaAtual > 1) setPaginaAtual(paginaAtual - 1);
  };

  const irParaProxima = () => {
    if (paginaAtual < totalPaginas) setPaginaAtual(paginaAtual + 1);
  };

  const corLinha = (index) => {
    if (index % 2 === 0) {
        return styles.tableRowGray
    } else {
        return styles.tableRowWhite
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles. containerLista}>
      <h2 className={styles.title}>Registro de Votos</h2>
      <div>
        <div>
          <table className={styles.tabela}>
            <thead>
              <tr className={styles.tableTitle}>
                <th>Aluno</th>
                <th>Atividade</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {dadosPagina.map((item, index) => (
                <tr key={index} className={corLinha(index)}>
                  <td>{item.nome}</td>
                  <td>{item.idade}</td>
                  <td className={styles.data}>{item.cidade}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.containerPaginacao}>
            <div className={styles.paginacao}>
              {paginaAtual > 1 && (
                <IoChevronBackOutline
                  size={30}
                  onClick={irParaAnterior}
                  style={{ cursor: "pointer" }}
                />
              )}
              {paginas
                .filter(
                  (pagina) =>
                    pagina === paginaAtual ||
                    pagina === paginaAtual + 1 ||
                    (paginaAtual === totalPaginas && pagina === paginaAtual - 1)
                )
                .map((pagina) => (
                  <span key={pagina} className={marcaPagina(pagina)}>
                    {pagina}
                  </span>
              ))}
              {paginaAtual < totalPaginas && (
                <IoChevronForward
                  size={30}
                  onClick={irParaProxima}
                  style={{ cursor: "pointer" }}
                />
              )}
            </div>
          </div>
      </div>
    </div>
    </div>
    </div>
  );
}

export default RegistroVotos;
