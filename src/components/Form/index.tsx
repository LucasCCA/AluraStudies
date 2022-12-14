import React from "react";
import { ITarefa } from "../../types/tarefa";
import Button from "../Button";
import style from "./form.module.scss";
import { v4 as uuidv4 } from "uuid";

class Form extends React.Component<{
  setTarefas: React.Dispatch<React.SetStateAction<ITarefa[]>>;
}> {
  state = {
    tarefa: "",
    tempo: "00:00",
  };

  adicionarTarefa(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    this.props.setTarefas((tarefasAntigas) => [
      ...tarefasAntigas,
      { ...this.state, selecionado: false, completado: false, id: uuidv4() },
    ]);
    this.setState({
      tarefa: "",
      tempo: "00:00",
    });
  }

  render() {
    return (
      <form
        className={style.novaTarefa}
        onSubmit={this.adicionarTarefa.bind(this)}
      >
        <div className={style.inputContainer}>
          <label htmlFor="tarefa">Adicione um novo estudo</label>
          <input
            type="text"
            name="tarefa"
            id="tarefa"
            placeholder="O que você quer estudar?"
            value={this.state.tarefa}
            onChange={(ev) =>
              this.setState({ ...this.state, tarefa: ev.target.value })
            }
            required
          />
        </div>
        <div className={style.inputContainer}>
          <label htmlFor="tempo">Tempo</label>
          <input
            type="time"
            step="1"
            name="tempo"
            id="tempo"
            min="00:00:00"
            max="01:30:00"
            value={this.state.tempo}
            onChange={(ev) =>
              this.setState({ ...this.state, tempo: ev.target.value })
            }
            required
          />
        </div>

        <Button type="submit">Adicionar</Button>
      </form>
    );
  }
}

export default Form;
