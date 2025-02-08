$(document).ready(function () {
  loadComponents()
    .then(() => {
      setInitialState();
      attachEventListeners();
      setTimeout(() => {
        $("#spinner").remove();
        $("#contents").removeClass("loading");
      }, 1000);
    })
    .catch((error) => {
      console.error("Error loading components:", error);
      $("body").html('<h1 class="d-flex justify-content-center align-items-center" style="height: 100vh;">error</h1>');
    });
});

function loadComponents() {
  return loadElement("#navbar-container", "navbar.html")
    .then(() => loadElement("#content-container1", "container1.html"))
    .then(() => loadElement("#content-container2", "container2.html"))
    .then(() => loadElement("#content-container3", "container3.html"))
    .then(() => loadElement("#content-container4", "logs.html"));
}

function loadElement(selector, url) {
  return new Promise((resolve, reject) => {
    $(selector).load(url, function (response, status, xhr) {
      if (status === "success") {
        resolve();
      } else {
        reject(`Failed to load ${url}: ${xhr.statusText}`);
      }
    });
  });
}

function setInitialState() {
  $(".container").hide();
  $("#content-container1").show();
  $(".nav-item").first().addClass("active");
}

function attachEventListeners() {
  // Navigation Highlight
  $(".nav-link").on("click", function (event) {
    event.preventDefault();
    $(".nav-item").removeClass("active");
    $(this).closest(".nav-item").addClass("active");

    let target = $(this).attr("href").substring(1);
    $(".container").hide();
    $("#content-" + target).show();
  });

  // Option Disabling
  $("#option1").on("click", function () {
    disableElement("option4");
    enableElement("option5");
    $("#option5").prop("checked", true);
  });

  $("#option2").on("change", function () {
    disableElement("option5");
    enableElement("option4");
    $("#option4").prop("checked", true);
  });

  $("#option3").on("change", function () {
    enableElement("option4");
    disableElement("option5");
  });

  $("input[name='options-group2']").on("change", function () {
    let currentOption = $(this);
    if (currentOption.is("#option4")) {
      disableElement("option5");
      enableElement("option4");
    } else if (currentOption.is("#option5")) {
      disableElement("option4");
      enableElement("option5");
    }
  });

  // Toast Popup Notification
  function displayToast(buttonId, toastId) {
    const toastTrigger = $("#" + buttonId);
    const toastLiveExample = $("#" + toastId);

    if (toastTrigger.length) {
      const toastBootstrap = new bootstrap.Toast(toastLiveExample[0]);

      toastTrigger.on("click", function () {
        event.preventDefault();
        const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        toastLiveExample.find("small").text(currentTime);
        toastLiveExample.find(".toast-body").text(buttonId);
        toastBootstrap.show();
      });
    }
  }

  displayToast("submit1", "liveToast");
  displayToast("submit2", "liveToast");
  displayToast("submit3", "liveToast");

  // Log Toggle
  $("#toggleLog").on("click", function () {
    var $logContainer = $(".log-container");

    // Fade in or fade out the log container
    if ($logContainer.is(":visible")) {
      $logContainer.fadeOut();
    } else {
      $logContainer.fadeIn();
    }
  });

  // Log Clear
  $("#clearLog").on("click", function () {
    $(".log-container tbody").empty(); // Remove all table rows within tbody
  });

  // Add messages to log
  function addRow(message) {
    const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newRow = `<tr><td>${currentTime}</td><td>${message}</td></tr>`;
    $(".log-container tbody").prepend(newRow);
  }

  $("#submit1").on("click", function () {
    addRow("Message from Submit 1");
  });

  $("#submit2").on("click", function () {
    addRow("Message from Submit 2");
  });

  $("#submit3").on("click", function () {
    addRow("Message from Submit 3");
  });
}
