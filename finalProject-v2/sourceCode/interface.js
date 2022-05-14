//--------------------------------------------------------------------------------------------------------------------------------|Menu Section
class menuClass {
  constructor() {
    this.mmActive = true;
    this.pmActive = false;
    this.omActive = false;
    this.amActive = false;
  }

  menuToggle(menu) {
    if (menu == "main") {
      if (this.mmActive) {
        this.mmActive=false;
      } else {
        this.mmActive=true;
        this.pmActive=false;
      }
    } else if (menu == "pause") {
      if (!this.mmActive&&this.pmActive) {
        this.pmActive=false;
      } else if (!this.mmActive&&!this.pmActive) {
        this.pmActive=true;
      }
    }
    this.update();
  }

  update() {
    if (this.mmActive) {
      document.getElementById("menu-Main").style.visibility="visible";
    } else {
      document.getElementById("menu-Main").style.visibility="hidden";
    }

    if (this.pmActive) {
      document.getElementById("menu-Pause").style.visibility="visible";
    } else {
      document.getElementById("menu-Pause").style.visibility="hidden";
    }


    if (this.mmActive || this.pmActive) {
      paused = true;
      //document.getElementById("uiContainer").style.visibility="hidden";
    } else {
      paused = false;
      //document.getElementById("uiContainer").style.visibility="visible";
    }
  }

  controls(key) {
    if (key == 13 && this.mmActive) {
      this.menuToggle("main");
    } else if (key == 27) {
      if (this.omActive) {
        this.menuToggle("options");
      } else if (this.amActive) {
        this.menuToggle("about");
      } else if (!this.mmActive) {
        this.menuToggle("pause");
      }
    }
  }
}

var menu = new menuClass();
