class BarChart
{
    constructor({wrapperClass,height,data,xScale,yScale,xKey,yKey,fillColor})
    {
        this.data = data;
        this.wrapper = wrapperClass;
        this.margin = { top:20,left:30,right:20,bottom:80 };
        this.svg = d3.select(`.${wrapperClass}`).append("svg");

        this.height = height;
        this.width = '100%';
        
        this.fillColor = fillColor;
        
        this.xKey = xKey;
        this.yKey = yKey;
 
        this.svg
        .attr('width',this.width)
        .attr('height',this.height);
 
        this.setup( xScale,yScale );
 
        window.addEventListener('resize',() => this.plot())

         
    }

    setup(xScale,yScale)
    {
        d3.selectAll(`.${this.wrapper} g`).remove();

        const svgWrap = document.querySelector(`.${this.wrapper}`);

        const w = svgWrap.getBoundingClientRect().width;
        const h = svgWrap.getBoundingClientRect().height;  
        
        const iW = w - this.margin.left - this.margin.right;
        const iH = h - this.margin.top - this.margin.bottom;

        this.iW = iW;        
        this.iH = iH;

        this.yScale = yScale
          .range([iH,0]).nice();

        this.xScale = xScale
            .range([0,iW])   
            .paddingInner(0.4);

        const yAxis = d3.axisLeft(this.yScale);
        const xAxis = d3.axisBottom(this.xScale).tickSize(0);
        
        this.plot(xAxis,yAxis)
    
               

    }

    plot(xAxis,yAxis)
    {

        const graph = this.svg.append('g').attr('class','graph');
        const axes = graph.append('g').attr('class','axes')


        graph
        .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

        axes.append("g")
        .attr('class','x-axis')
        .attr('transform',`translate(0,${this.iH})`)   
        .call(xAxis)
        .selectAll("text");

        axes
        .append('g')
        .call(yAxis.tickSize(-this.iW)
        .tickSizeOuter(0));

        graph.selectAll('.domain').remove(); 

        graph.selectAll('.tick')
        .attr('stroke-dasharray','5 5') 

        graph.selectAll('.tick line')
        .attr("stroke",this.fillColor);
        
        graph.selectAll('.tick text')
        .attr("fill",this.fillColor);
       

        const norm = d =>  this.iH - this.yScale( this.extractValue(d,this.yKey)) ;


         const rect = graph.selectAll('rect').data(this.data);

        rect
         .enter()
         .append('rect')
         .attr('x', d => this.xScale(this.extractValue(d,this.xKey)))
         .attr('height', d => norm(d))
         .attr('width',this.xScale.bandwidth())
         .attr('transform',d => `translate(0,${this.yScale(this.extractValue(d,this.yKey))})`)
         .attr('fill',this.fillColor);




    }

    update(data,xScale,yScale)
    {
        this.data = data;
        this.setup(xScale,yScale);          
    }

    extractValue(item,key)
    {
       return item[key] ;
    }
 

}