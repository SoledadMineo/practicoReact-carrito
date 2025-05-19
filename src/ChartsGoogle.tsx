import { useEffect, useState } from "react";
import Chart from "react-google-charts";
import MenuOpciones from "./componentes/MenuOpciones";
import { getDatosChartLineFetch, getDatosChartPieFetch } from "./servicios/FuncionesApi";

export const optionsLine = {
        // title: "Cantidad de Pedidos por Mes y Año",
        // curveType: "function",
        // legend: { position: "bottom" },

    title: "Cantidad de Pedidos por Mes y Año",
    chartArea: { width: "70%" },
    hAxis: {
        title: "Cantidad de Pedidos",
        minValue: 0,
    },
    vAxis: {
        title: "Mes-Año",
    },
};

export const optionsPie = {
  title: "Cantidad de pedidos por Instrumentos",
};

function ChartsGoogle() {   

    const [datosChartLine, setDatosChartLine] = useState<any>();
    const [datosChartPie, setDatosChartPie] = useState<any>();
    
    const getLineChart =  async () => {
        const datosBackend = await getDatosChartLineFetch();
        console.log(datosBackend);
        setDatosChartLine(datosBackend);
    }

    const getPieChart =  async () => {
        const datosBackend = await getDatosChartPieFetch();
        console.log(datosBackend);
        setDatosChartPie(datosBackend);
    }

    useEffect(() => {
        getLineChart();
        getPieChart();
    }, []);


    return (
            <>
            <MenuOpciones></MenuOpciones>
            <Chart
            chartType="LineChart"
            data={datosChartLine}
            options={optionsLine}
            width="100%"
            height="400px"
            />    
            <Chart
            chartType="PieChart"
            data={datosChartPie}
            options={optionsPie}
            width={"100%"}
            height={"400px"}
            />        
            </>
            )
    }
    
export default ChartsGoogle