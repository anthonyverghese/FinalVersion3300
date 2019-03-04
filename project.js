let spotifyData = [];
        d3.csv("genreSpotifyData.csv").then( function(data) {
        spotifyData = data;
        spotifyData.forEach( (d) => {
          d['energy'] = Number(d['energy']);
          d['danceability'] = Number(d['danceability']);
          d['audio_valence'] = Number(d['audio_valence']);
          d['song_popularity'] = Number(d['song_popularity']);
        });
        console.log(spotifyData);
        let maxEnergy = d3.max(spotifyData, function(d) {return d['energy']; });
        let minEnergy = d3.min(spotifyData, function(d) { return d['energy']; });
        let maxValence = d3.max(spotifyData, function(d) { return d['audio_valence']; });
        let minValence = d3.min(spotifyData, function(d) { return d['audio_valence']; });
        let maxDance = d3.max(spotifyData, function(d) { return d['danceability']; });
        let minDance = d3.min(spotifyData, function(d) { return d['danceability']; });
        let maxPopularity = d3.max(spotifyData, function(d) { return d['song_popularity']; });
        let minPopularity = d3.min(spotifyData, function(d) { return d['song_popularity']; });
        let q3 = d3.select("#viz");
        q3.append("svg").attr("width", 800).attr("height", 600).attr("id", "chart");
        let svg = d3.select("svg#chart")
        let width = d3.select("#chart").attr("width");
        let height = d3.select("#chart").attr("height");
        let margin = { top: 60, right: 40, bottom: 70, left: 60};
        let chartWidth = width - margin.left - margin.right;
        let chartHeight = height - margin.top - margin.bottom;
        let danceScale = d3.scaleLinear().domain([minDance,maxDance]).range([1,10]);
        let energyScale = d3.scaleLinear().domain([Math.round(minEnergy *10)/10,maxEnergy]).range([margin.left,chartWidth]);
        let valenceScale = d3.scaleLinear().domain([0,maxValence]).range([chartHeight ,margin.top]);
        let popularityScale = d3.scaleLinear().domain([minPopularity,maxPopularity]).range([1,12]);
        let x_axis = d3.axisBottom(energyScale);
        let y_axis = d3.axisLeft(valenceScale);

        let arrayOfGenres = ["00s Rock Anthems", "100% LatinX", "90's Hip-Hop Don't Stop", "African Heat", "Alternative 00s", "Country's Greatest Hits_ The '90s", "Pop Royalty", "RapCaviar"]
        const genreScale = d3.scaleOrdinal()
          .domain(arrayOfGenres)
          .range(["Purple", "#ff9966", "Gold", "#ff3300", "DeepSkyBlue", "Teal", "HotPink", "LimeGreen"]);

          genreScale.domain().forEach(function(d,i) {
          let actualDisplay = "African Heat";
          if (d === "00s Rock Anthems") {
            actualDisplay = "Rock";
          } else if (d === "100% LatinX") {
            actualDisplay = "Latin";
          } else if (d === "90's Hip-Hop Don't Stop") {
            actualDisplay = "Hip-Hop";
          } else if (d === "Alternative 00s") {
            actualDisplay = "Alternative";
          } else if (d === "Country's Greatest Hits_ The '90s") {
            actualDisplay = "Country";
          } else if (d === "Pop Royalty") {
            actualDisplay = "Pop";
          } else if (d === "RapCaviar"){
            actualDisplay = "Rap";
          }
          d3.select("#ourLegend")
            .append("span").text(actualDisplay + "      ")
            .style("color", genreScale(d))
            .style("font-size", "20px")
        });
        //console.log(d3.schemeCategory10.range());

        svg.append("text")
          .attr("x", (chartWidth / 2) + 60)
          .attr("y",  margin.top - 20)
          .attr("text-anchor", "middle")
          .style("font-size", "35px")
          .style("fill", "LimeGreen")
          .text("Spotify Data Analysis");

        svg.append("text")
          .attr("x", (chartWidth / 2) + 60)
          .attr("y",  margin.top + 10)
          .attr("text-anchor", "middle")
          .style("font-size", "15px")
          .style("fill", "LimeGreen")
          .text("Radius Size indicates Popularity");

        //This link (https://bl.ocks.org/d3noob/23e42c8f67210ac6c678db2cd07a747e) helped me with
        //making axis titles
        svg.append("text")
          .attr("transform",
                "translate(" + (chartWidth/2) + " ," +
                               (chartHeight + margin.top + 50) + ")")
          .style("text-anchor", "middle")
          .style("fill", "LimeGreen")
          .style("font-size", "25px")
          .text("Energy");

        svg.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", margin.left - 60)
          .attr("x",0 - (height / 2) - 60)
          .attr("dy", "1em")
          .style("text-anchor", "middle")
          .style("fill", "LimeGreen")
          .style("font-size", "25px")
          .text("Valence");

        svg.append("g").style("stroke", "LimeGreen").style("fill", "LimeGreen").attr("transform","translate(0 , "
         +(chartHeight + margin.top)+")").call(x_axis);
       svg.append("g").style("stroke", "LimeGreen").style("fill", "LimeGreen").attr("transform","translate("+margin.left+ " , "
         +(margin.top)+")").call(y_axis);
        spotifyData.forEach(function(d,i) {
        svg.append("circle")
        // .attr("r", (99-i)/10 + 2)
          .attr("r", popularityScale(d['song_popularity']))
          .attr("cx", energyScale(d['energy']))
          .attr("cy", valenceScale(d['audio_valence']) + margin.top)
          .style("fill", genreScale(d['playlist']))
          .style("opacity", "0.6");
      });



      let genreOfInterest = "00s Rock Anthems";
      top10 = spotifyData.filter( d => d['playlist'] == genreOfInterest);
      //       top10 = top10.filter( d => d['duration_ms'] != 'NaN');

      svg = d3.select("#drakeballs");
      svg.attr("width", 400).attr("height", 250);

      //apply filter here
      spotifyData = top10;

      margin = { "top": 10, "right": 150, "bottom": 10, "left":10};
      width = svg.attr("width");
      height = svg.attr("height");
      chartwidth = width - margin["left"] - margin["right"];
      chartheight = height - margin["top"]-margin["bottom"];


      //danceScale = d3.scaleLinear().domain([minDance,maxDance]).range([0,230]);
      energyScale = d3.scaleLinear().domain([Math.round(minEnergy *10)/10,maxEnergy]).range([0, 230]);
      valenceScale = d3.scaleLinear().domain([0,maxValence]).range([230,0]);
      popularityScale = d3.scaleLinear().domain([minPopularity,maxPopularity]).range([1,3]);
      let colorOfPoints = "Purple";


      svg.append("g").attr("id","drakestuffs")
      svgb2 = d3.select("g#drakestuffs");

      for(k=0;k < spotifyData.length;k++){
          svgb2.append("circle")

          .attr("cx",energyScale(spotifyData[k].energy)+margin["left"])
          .attr("cy",valenceScale(spotifyData[k].audio_valence)+margin["top"])
          .attr("r",popularityScale(spotifyData[k].song_popularity))
          .style("fill", colorOfPoints)
          .attr("opacity",.7);

      }


      leftAxis = d3.axisLeft(valenceScale);
      svg.append("g")
        .attr("stroke-width",1.8)
        .attr("transform","translate("+(margin.left)+","+margin.top+")")
        .style("font", "12px times")
        .attr("class","yscale")
        .call(leftAxis.ticks(0));

      bottomAxis = d3.axisBottom(energyScale)
      svg.append("g")
        .attr("stroke-width",1.8)
        .style("font", "12px times")
        .attr("class","xscale")
        .attr("transform","translate("+(margin.left)+","+(chartheight + margin.top)+")")
        .call(bottomAxis.ticks(0));

      // yScale = d3.scaleLinear().domain([1, 0]).range([0,230]);
      // xScale = d3.scaleLinear().domain([0, 1000000]).range([0, 230]);
      // rScale = d3.scaleLinear().domain([loMin, loMax]).range([1, 3]);
      // colorScale = d3.scaleSequential(d3.interpolateCool).domain([0, liMax])


      svg.append("g").attr("id","drakestuffs")
      svgb2 = d3.select("g#drakestuffs");




      spotifyData = data;

      genreOfInterest = "African Heat";
      top10 = spotifyData.filter( d => d['playlist'] === genreOfInterest);
      //       top10 = top10.filter( d => d['duration_ms'] != 'NaN');

      svg = d3.select("#kendrickballs");
      svg.attr("width", 400).attr("height", 250);

      //apply filter here
      spotifyData = top10;
      console.log(spotifyData);

      margin = { "top": 10, "right": 150, "bottom": 10, "left":10};
      width = svg.attr("width");
      height = svg.attr("height");
      chartwidth = width - margin["left"] - margin["right"];
      chartheight = height - margin["top"]-margin["bottom"];


      //danceScale = d3.scaleLinear().domain([minDance,maxDance]).range([0,230]);
      energyScale = d3.scaleLinear().domain([Math.round(minEnergy *10)/10,maxEnergy]).range([0, 230]);
      valenceScale = d3.scaleLinear().domain([0,maxValence]).range([230,0]);
      popularityScale = d3.scaleLinear().domain([minPopularity,maxPopularity]).range([1,3]);
      colorOfPoints = "Red";


      svg.append("g").attr("id","kendrickstuffs")
      svgb2 = d3.select("g#kendrickstuffs");

      for(k=0;k < spotifyData.length;k++){
          svgb2.append("circle")

          .attr("cx",energyScale(spotifyData[k].energy)+margin["left"])
          .attr("cy",valenceScale(spotifyData[k].audio_valence)+margin["top"])
          .attr("r",popularityScale(spotifyData[k].song_popularity))
          .style("fill", colorOfPoints)
          .attr("opacity",.7);

      }


      leftAxis = d3.axisLeft(valenceScale);
      svg.append("g")
        .attr("stroke-width",1.8)
        .attr("transform","translate("+(margin.left)+","+margin.top+")")
        .style("font", "12px times")
        .attr("class","yscale")
        .call(leftAxis.ticks(0));

      bottomAxis = d3.axisBottom(energyScale)
      svg.append("g")
        .attr("stroke-width",1.8)
        .style("font", "12px times")
        .attr("class","xscale")
        .attr("transform","translate("+(margin.left)+","+(chartheight + margin.top)+")")
        .call(bottomAxis.ticks(0));
      })
      .catch( e => { console.log("Error: "+e.message);} );


// var musicdata;
//
// // d3.csv("featuresdf.csv").then(function(data) {
// d3.csv("spotify.csv").then(function(data) {
//
//     musicdata = data;
//
//     //Select the div
//     let q3 = d3.select("#viz");
//     q3.append("svg").attr("width", 800).attr("height", 800).attr("id","chart");
//     svg = d3.select("svg#chart");
//
//     //Set Constant Values
//     margin = { "top": 50, "right": 50, "bottom": 50, "left":50};
//     width = svg.attr("width");
//     height = svg.attr("height");
//     chartwidth = width - margin["left"] - margin["right"];
//     chartheight = height - margin["top"]-margin["bottom"];
//
//     //Max Values
//     const eMin = d3.min(musicdata, d => d['energy']);
//     const eMax = d3.max(musicdata, d => d['energy']);
//     const duMin = d3.min(musicdata, d => d['duration_ms']);
//     const duMax = d3.max(musicdata, d => d['duration_ms']);
//     const liMin = d3.min(musicdata, d => d['liveness']);
//     const liMax = d3.max(musicdata, d => d['liveness']);
//     const loMin = d3.min(musicdata, d => d['loudness']);
//     const loMax = d3.max(musicdata, d => d['loudness']);
//
//     console.log(duMax);
//
//     //Scales
//     yScale = d3.scaleLinear().domain([eMin, eMax]).range([chartheight,0]);
//     xScale = d3.scaleLinear().domain([0, 1000000]).range([0, chartwidth]);
//     rScale = d3.scaleLinear().domain([loMin, loMax]).range([1, 7]);
//     colorScale = d3.scaleSequential(d3.interpolateCool).domain([0, liMax])
//
//     //Background
//     svg.append("rect")
//         .attr("x", margin["left"])
//         .attr("y", margin["top"])
//         .attr("height", chartheight)
//         .attr("width", chartwidth)
//         .attr("id","viz-background")
//         .attr("fill", "#1c1c1c");
//
//     //Draw all circles
//     svg.append("g").attr("id","datapoints")
//     svgb2 = d3.select("g#datapoints");
//
//     for(k=0;k < musicdata.length;k++){
//       if (musicdata[k].duration_ms != 'NaN' && musicdata[k].energy != 'NaN'){
//         svgb2.append("circle")
//
//           .attr("cx",xScale(musicdata[k].duration_ms)+margin["left"])
//           .attr("cy",yScale(musicdata[k].energy)+margin["top"])
//           .attr("r",rScale(musicdata[k].loudness))
//           .style("fill", colorScale(musicdata[k].liveness))
//           .attr("opacity",.7);
//         }
//
//     }
//
//
//     leftAxis = d3.axisLeft(yScale);
//     svg.append("g")
//       .attr("stroke-width",1.8)
//       .attr("transform","translate("+(margin.left)+","+margin.top+")")
//       .style("font", "12px times")
//       .attr("class","yscale")
//       .call(leftAxis.ticks(5));
//
//
//
//     bottomAxis = d3.axisBottom(xScale)
//     svg.append("g")
//       .attr("stroke-width",1.8)
//       .style("font", "12px times")
//       .attr("class","xscale")
//       .attr("transform","translate("+(margin.left)+","+(chartheight + margin.top)+")")
//       .call(bottomAxis.ticks(5));
//
//
//
//       //NEW Vizualzation
//
//       svg = d3.select("#DrakeRec");
//       svg.attr("width", 250).attr("height", 100).attr("id","info");
//
//       artists = "Drake"
//       console.log(musicdata)
//       top10 = musicdata.filter( d => d['artist'] == artists);
//       top10 = top10.filter( d => d['duration_ms'] != 'NaN');
//
//       console.log(top10);
//       //const test = d3.mean(musicdata, d => d['energy']);
//       //console.log(test)
//       const dmeanlo = d3.mean(top10, d => d['loudness']);
//       const dmeanli = d3.mean(top10, d => d['liveness']);
//       const dmeandu = d3.mean(top10, d => d['duration_ms']);
//       const dmeanen = d3.mean(top10, d => d['energy']);
//
//       svg.append("text")
//         .attr("x","10")
//         .attr("y","30")
//         .attr("fill","crimson")
//         .attr("font-size","20px")
//         .attr("class","font title")
//         .text(artists);
//       svg.append("text")
//           .attr("x","10")
//           .attr("y","55")
//           .attr("fill","white")
//           .attr("font-size","14px")
//           .attr("class","font title")
//           .text("AVG loudness:" + Math.abs((dmeanlo)));
//       svg.append("text")
//               .attr("x","10")
//               .attr("y","80")
//               .attr("fill","white")
//               .attr("font-size","14px")
//               .attr("class","font title")
//               .text("AVG energy:" + Math.abs((dmeanen)));
//
//
//       //Balls
//       svg = d3.select("#drakeballs");
//       svg.attr("width", 400).attr("height", 250);
//
//       musicdata = top10;
//
//       margin = { "top": 10, "right": 150, "bottom": 10, "left":10};
//       width = svg.attr("width");
//       height = svg.attr("height");
//       chartwidth = width - margin["left"] - margin["right"];
//       chartheight = height - margin["top"]-margin["bottom"];
//
//       yScale = d3.scaleLinear().domain([1, 0]).range([0,230]);
//       xScale = d3.scaleLinear().domain([0, 1000000]).range([0, 230]);
//       rScale = d3.scaleLinear().domain([loMin, loMax]).range([1, 3]);
//       colorScale = d3.scaleSequential(d3.interpolateCool).domain([0, liMax])
//
//
//       svg.append("g").attr("id","drakestuffs")
//       svgb2 = d3.select("g#drakestuffs");
//
//       for(k=0;k < musicdata.length;k++){
//         if (musicdata[k].duration_ms != 'NaN' && musicdata[k].energy != 'NaN'){
//           svgb2.append("circle")
//
//           .attr("cx",xScale(musicdata[k].duration_ms)+margin["left"])
//           .attr("cy",yScale(musicdata[k].energy)+margin["top"])
//           .attr("r",rScale(musicdata[k].loudness))
//           .style("fill", colorScale(musicdata[k].liveness))
//           .attr("opacity",.7);
//             }
//
//       }
//
//
//       leftAxis = d3.axisLeft(yScale);
//       svg.append("g")
//         .attr("stroke-width",1.8)
//         .attr("transform","translate("+(margin.left)+","+margin.top+")")
//         .style("font", "12px times")
//         .attr("class","yscale")
//         .call(leftAxis.ticks(0));
//
//       bottomAxis = d3.axisBottom(xScale)
//       svg.append("g")
//         .attr("stroke-width",1.8)
//         .style("font", "12px times")
//         .attr("class","xscale")
//         .attr("transform","translate("+(margin.left)+","+(chartheight + margin.top)+")")
//         .call(bottomAxis.ticks(0));
//
//         //370
//       rScale = d3.scaleLinear().domain([loMin, loMax]).range([1, 15]);
//
//       by = 240
//       bx = 30
//
//       for(k=0;k<5;k++){
//
//         ra=Math.floor((Math.random() * musicdata.length) + 1)
//         svg.append("circle")
//         .attr("cx",by)
//         .attr("cy",bx)
//         .attr("r",rScale(musicdata[ra].loudness))
//         .style("fill",colorScale(musicdata[ra].liveness))
//         .attr("opacity",1);
//         svg.append("text")
//         .attr("x",by+20)
//         .attr("y",bx+5)
//         .attr("fill","white")
//         .attr("font-size","10px")
//         .attr("class","font drakeblz")
//         .text(musicdata[ra].song_title);
//         bx = bx + 40
//       }
//
//
//
//
//
//
//
//       svg = d3.select("#KendrickRec");
//       svg.attr("width", 250).attr("height", 100);
//
//       artists = "Future"
//       musicdata = data;
//       top10 = musicdata.filter( d => d['artist'] == artists);
//       top10 = top10.filter( d => d['duration_ms'] != 'NaN');
//       console.log(top10);
//       musicdata = top10;
//       //const test = d3.mean(musicdata, d => d['energy']);
//       //console.log(test)
//       const kmeanlo = d3.mean(top10, d => d['loudness']);
//       const kmeanli = d3.mean(top10, d => d['liveness']);
//       const kmeandu = d3.mean(top10, d => d['duration_ms']);
//       const kmeanen = d3.mean(top10, d => d['energy']);
//
//       svg.append("text")
//         .attr("x","10")
//         .attr("y","30")
//         .attr("fill","crimson")
//         .attr("font-size","20px")
//         .attr("class","font title")
//         .text(artists);
//       svg.append("text")
//           .attr("x","10")
//           .attr("y","55")
//           .attr("fill","white")
//           .attr("font-size","14px")
//           .attr("class","font title")
//           .text("AVG loudness:" + Math.abs((kmeanlo)));
//       svg.append("text")
//               .attr("x","10")
//               .attr("y","80")
//               .attr("fill","white")
//               .attr("font-size","14px")
//               .attr("class","font title")
//               .text("AVG energy:" + Math.abs((kmeanen)));
//
//
//       //Balls
//       svg = d3.select("#kendrickballs");
//       svg.attr("width", 400).attr("height", 250);
//
//       musicdata = top10;
//
//       margin = { "top": 10, "right": 150, "bottom": 10, "left":10};
//       width = svg.attr("width");
//       height = svg.attr("height");
//       chartwidth = width - margin["left"] - margin["right"];
//       chartheight = height - margin["top"]-margin["bottom"];
//
//       yScale = d3.scaleLinear().domain([1, 0]).range([0,230]);
//       xScale = d3.scaleLinear().domain([0, 1000000]).range([0, 230]);
//       rScale = d3.scaleLinear().domain([loMin, loMax]).range([1, 3]);
//       colorScale = d3.scaleSequential(d3.interpolateCool).domain([0, liMax])
//
//
//       svg.append("g").attr("id","kstuffs")
//       svgb2 = d3.select("g#kstuffs");
//
//       for(k=0;k < musicdata.length;k++){
//         if (musicdata[k].duration_ms != 'NaN' && musicdata[k].energy != 'NaN'){
//           svgb2.append("circle")
//
//           .attr("cx",xScale(musicdata[k].duration_ms)+margin["left"])
//           .attr("cy",yScale(musicdata[k].energy)+margin["top"])
//           .attr("r",rScale(musicdata[k].loudness))
//           .style("fill", colorScale(musicdata[k].liveness))
//           .attr("opacity",.7);
//             }
//
//       }
//
//
//       leftAxis = d3.axisLeft(yScale);
//       svg.append("g")
//         .attr("stroke-width",1.8)
//         .attr("transform","translate("+(margin.left)+","+margin.top+")")
//         .style("font", "12px times")
//         .attr("class","yscale")
//         .call(leftAxis.ticks(0));
//
//       bottomAxis = d3.axisBottom(xScale)
//       svg.append("g")
//         .attr("stroke-width",1.8)
//         .style("font", "12px times")
//         .attr("class","xscale")
//         .attr("transform","translate("+(margin.left)+","+(chartheight + margin.top)+")")
//         .call(bottomAxis.ticks(0));
//
//         //370
//       rScale = d3.scaleLinear().domain([loMin, loMax]).range([1, 15]);
//
//       by = 240
//       bx = 30
//
//       for(k=0;k<5;k++){
//
//         ra=Math.floor((Math.random() * 6) + 1)
//         svg.append("circle")
//         .attr("cx",by)
//         .attr("cy",bx)
//         .attr("r",rScale(musicdata[ra].loudness))
//         .style("fill",colorScale(musicdata[ra].liveness))
//         .attr("opacity",1);
//         svg.append("text")
//         .attr("x",by+20)
//         .attr("y",bx+5)
//         .attr("fill","white")
//         .attr("font-size","10px")
//         .attr("class","font drakeblz")
//         .text(musicdata[ra].song_title);
//         bx = bx + 40
//       }
//
//
//
//
//
//
// })
