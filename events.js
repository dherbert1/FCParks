function handleServices() {
    let flkty = new Flickity("photos__slider-item", {
      groupCells: 2,
      wrapAround: true,
      pageDots: true,
      prevNextButtons: true,
      responsive: [
        {
          breakpoint: 991.98,
          settings: {
            groupCells: 1,
          },
        },
      ],
      on: [ 
        {
          ready: function () {
            heightCard();
          },
        }
      ],
    });
  };