import "./Portfolio.css";

function Portfolio() {
  return (
    <section id="portfolio" className="portfolio">

      <nav className="portfolio-navbar">

        <h1>My Portfolio</h1>

        <ul className="portfolio-nav">
          <li><a href="#portfolio">All</a></li>
          <li><a href="#commercial">Commercial Ads</a></li>
          <li><a href="#short-films">Short Films</a></li>
          <li><a href="#reels">Reels</a></li>
          <li><a href="#music-videos">Music Videos</a></li>
        </ul>

      </nav>
      

      {

          /*commercialad*/

<section id="commercial" >
  <h1>Commercial Ads</h1>
        <div className="commercial-grid">


 <iframe
 width="100%"
  height="315"
   frameBorder="0"
      src="https://www.youtube.com/embed/65mnl48A-FY"
      title="Commercial Ad"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    ></iframe>

<iframe
  width="100%"
  height="315"
  src="https://www.youtube.com/embed/vj70vIG5AcE"
  title="Commercial Ad"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>


<iframe
  width="100%"
  height="315"
  src="https://www.youtube.com/embed/jqGOUsSCnVE"
  title="Commercial Ad"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>

<iframe
  width="100%"
  height="315"
  src="https://www.youtube.com/embed/4wtaF_Xs9o8"
  title="Commercial Ad"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>

  

</div>
</section>

      }
    
{
  /*shortfilm */
  
  <section id="short-films">
        <h1>Short Films</h1>
        <div className="short-films-grid">

<iframe
  width="100%"
  height="315"
  src="https://www.youtube.com/embed/dMf3ZFYCyco"
  title="Short Film"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>
<iframe
  width="100%"
  height="315"
  src="https://www.youtube.com/embed/b9cfV3iKSsI"
  title="Short Film"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>

<iframe
  width="100%"
  height="315"
  src="https://www.youtube.com/embed/3t6vnCv-WlY"
  title="Short Film"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>
<iframe
  width="100%"
  height="315"
  src="https://www.youtube.com/embed/2byQMRwLYV8"
  title="Short Film"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>
  

</div>
</section>
}
 

{
<section id="music-videos" >
        <h1>Music Videos</h1>
        <div className="music-videos-grid">

 <iframe
  width="100%"
  height="315"
  src="https://www.youtube.com/embed/e4csxJuVAG4"
  title="Short Film"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>
  

  <iframe
  width="100%"
  height="315"
  src="https://www.youtube.com/embed/kbFUit-XQA4"
  title="Short Film"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>

 <iframe
  width="100%"
  height="315"
  src="https://www.youtube.com/embed/PfPjiJAqxyo"
  title="Short Film"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>

</div>
</section>

}
  {  /* commercial reels */

    
<section id="reels" >
        <h1>Reels</h1>
        <div className="reels-grid">

  <iframe
  width="100%"
  height="315"
  src="https://www.youtube.com/embed/gaEq7CeGm5s"
  title="Short Film"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>

  <iframe
  width="100%"
  height="315"
  src="https://www.youtube.com/embed/3YXl7u0IE18"
  title="Short Film"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>

<iframe
  width="100%"
  height="315"
  src="https://www.youtube.com/embed/Z7g93AViXA0"
  title="Short Film"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>

<iframe
  width="100%"
  height="315"
  src="https://www.youtube.com/embed/e4csxJuVAG4"
  title="Short Film"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>

</div>
</section>
}

  </section>

      
  );
}

export default Portfolio;
