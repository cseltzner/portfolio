/**************************
 * Light/Dark mode toggle *
 **************************/
const lightIcon = document.getElementById("light");
const darkIcon = document.getElementById("dark");

const toggleDarkMode = (/** @type {Boolean} */ darkMode) => {
    if (darkMode) {
        document.body.setAttribute("data-dark", "true");
        lightIcon.classList.add("hidden");
        darkIcon.classList.remove("hidden");
        localStorage.setItem("dark", "true");
    } else {
        document.body.removeAttribute("data-dark");
        darkIcon.classList.add("hidden");
        lightIcon.classList.remove("hidden");
        localStorage.removeItem("dark");
    }
}

lightIcon.addEventListener("click", () => toggleDarkMode(true));
darkIcon.addEventListener("click", () => toggleDarkMode(false));

if (localStorage.getItem("dark") === "true") toggleDarkMode(true);


/**************************
 * Projects Section Chips *
 **************************/
const projects = Array.from(
  document.querySelectorAll(".project__card-list .project__card")
);

/** @type Array<HTMLInputElement> */
const chips = Array.from(document.querySelectorAll(".chip-group__input"));

const projectCategories = ["react", "nodejs", "aspnet", "kotlin"];

chips.forEach((chip) => {
  chip.addEventListener("change", (e) => {
    // "All" chip clicked
    if (chip.value === "all") {
      // Remove the "hidden" class
      projects.forEach((project) => {
        project.classList.remove("card--hidden");
      });
      return;
    }

    // Any other chip clicked
    projectCategories.forEach(projectCategory => {
        if (projectCategory === chip.value) {
            showProjectsByValue(projectCategory);
        }
    })
  });
});

/**
 * Removes "card--hidden" class to projects containing the "date-categories" attribute with a value of the "value" parameter.
 * Adds "card--invisible" class to all other projects
 * @param {string} value - value of "data-categories" attribute in which the "card--hidden" class is to be removed from
 */
function showProjectsByValue(value) {
    projects.forEach((project) => {
      const projectCategories = project
        .getAttribute("data-categories")
        ?.split("/");
      if (projectCategories?.includes(value)) {
        project.classList.remove("card--hidden");
      } else {
        project.classList.add("card--hidden");
      }
    });
  }