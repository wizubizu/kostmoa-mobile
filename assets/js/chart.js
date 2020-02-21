const items = ["Semo","Noodles","Coke","Wafers","Milo","Fanta"];
const all = [];
const semo = [];
const nood = [];
const coke = [];
const waf = [];
const milo = [];
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

let start = 0;
let step = 6;


let  chart;
const select = document.querySelector('#graph-select');

const next = document.querySelector('.next');
const prev = document.querySelector('.prev');

select.addEventListener('change',changeGraph);
next.addEventListener('click',updateChart);
prev.addEventListener('click',updateChart);


function generateQty()
{
    const max = 100,min = 0;

    return Math.round((max-min)*Math.random() + min);
}

function generateDataAll()
{

    items.forEach( item => 
        {
              all.push( 
                  {
                      item,
                      qty:generateQty()
                  } )
        } );
}

function generateDataItem()
{
    months.forEach( month => 
        {
              semo.push( 
                  {
                      month,
                      qty:generateQty()
                  } )
        } );

}

//Switch b/w graph based on options
function changeGraph()
{

     d3.selectAll(`.item-analysis svg`).remove();

      const value = event.target.value;

      if(value == "all")
      {
        chart = new BarChart(chartConfig);
        
        next.classList.add('hidden');
        
        prev.classList.add('hidden');
      }
      else
      {
        chart = new BarChart(chartConfig2);  
        
        next.classList.remove('hidden');
        prev.classList.add('hidden');
      }
}

//switch b/w months 
function updateChart()
{
    if(start == 0)
    {
        start +=step;
        next.classList.add('hidden');
        prev.classList.remove('hidden');
        
    }
    else
    {
        prev.classList.add('hidden');
        next.classList.remove('hidden');
        start = 0;
    }

    const data = semo.slice(start,start+step);

    const xScale = d3.scaleBand().domain(data.map( d => d.month ));
    const yScale =  d3.scaleLinear().domain([0,100]);

    chart.update(data,xScale,yScale);
}

generateDataAll();
generateDataItem()

const chartConfig = 
{
    data:all,
    wrapperClass:"item-analysis",
    height: 250,
    xKey:"item",
    yKey:"qty",
    xScale: d3.scaleBand().domain(all.map( d => d.item )),
    yScale: d3.scaleLinear().domain([0,100]),
    fillColor:"#00ce88"
};

const chartConfig2 = 
{
    data:semo.slice(start,start+step),
    wrapperClass:"item-analysis",
    height: 250,
    xKey:"month",
    yKey:"qty",
    xScale: d3.scaleBand().domain(semo.slice(start,start+step).map( d => d.month )),
    yScale: d3.scaleLinear().domain([0,100]),
    fillColor:"#00ce88"
};


chart = new BarChart(chartConfig);






