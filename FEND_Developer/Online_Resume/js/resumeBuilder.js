var bio = {
  name: "Antonio Guzman",
  role: "Front-End Web Developer",
  contacts: {
    mobile: "619-227-6962",
    email: "ant.lis.guzman1@gmail.com",
    github: "alguzman1",
    twitter: "N/A",
    location: "Washington, DC"
  },
  skills: ["HTML", "CSS", "JavaScript", "SQL", "Python", "jQuery", "Bootstrap", "AJAX", "Git", "Front-end Development", "SAP HANA", "SAP Webi", "SAP DataServices"],
  welcomeMessage: "Thanks for stopping by!",
  biopic: "images/me.jpg",

  display: function() {
    var formattedName = HTMLheaderName.replace("%data%", bio.name);
    var formattedRole = HTMLheaderRole.replace("%data%", bio.role);
    var formattedMobile = HTMLmobile.replace("%data%", bio.contacts.mobile);
    var formattedEmail = HTMLemail.replace("%data%", bio.contacts.email);
    var formattedGithub = HTMLgithub.replace("%data%", bio.contacts.github);
    var formattedTwitter = HTMLtwitter.replace("%data%", bio.contacts.twitter);
    var formattedLocation = HTMLlocation.replace("%data%", bio.contacts.location);
    var formattedBioPic = HTMLbioPic.replace("%data%", bio.biopic);
    var formattedWelcomeMessage = HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage);

    $("#header").prepend(formattedRole);
    $("#header").prepend(formattedName);
    $("#header").append(formattedBioPic);
    $("#header").append(formattedWelcomeMessage);
    $("#topContacts, #footerContacts").append(formattedMobile, formattedEmail, formattedGithub, formattedTwitter, formattedLocation);

    if (bio.skills.length > 0) {
      $("#header").append(HTMLskillsStart);
      for (var x=0, length = bio.skills.length; x<length; x++) {
        var formattedSkills = HTMLskills.replace("%data%", bio.skills[x]);
        $("#skills").append(formattedSkills);
      }
    }
  }
};

var work = {
  jobs: [
    {
      employer: "Alta Via Consulting, LLC",
      title: "SAP HANA/BW Consultant",
      location: "Washington, DC",
      dates: "2017-Present",
      description: "Business Process and Procedures, Business Intelligence, Technical and Audit Support."
    },
    {
      employer: "CWU, Inc.",
      title: "CAT III Linguist",
      location: "San Antonio, TX",
      dates: "2015-2016",
      description: "Signal Intelligence."
    },
    {
      employer: "SAP NS2 Serves",
      title: "SAP Application Associate",
      location: "Leesberg, VA",
      dates: "2016",
      description: "Participated in a 12-week SAP professional development and IT training immersion program."
    },
       {
      employer: "Metlang",
      title: "Analytical Linguist",
      location: "San Diego, CA",
      dates: "2012",
      description: "Title III Wiretap Analyst and Translator."
    },
    {
      employer: "United States Marine Corps",
      title: "Sergeant",
      location: "Quantico, VA",
      dates: "2006-2012",
      description: "Marine Security Guard, Administration Specialist, Emabassy Security."
    }
  ],
  display: function() {
    if (work.jobs.length > 0) {
      for (var x=0, length = work.jobs.length; x<length; x++) {
        var formattedEmployer = HTMLworkEmployer.replace("%data%", work.jobs[x].employer);
        var formattedTitle = HTMLworkTitle.replace("%data%", work.jobs[x].title);
        var formattedDates = HTMLworkDates.replace("%data%", work.jobs[x].dates);
        var formattedLocation = HTMLworkLocation.replace("%data%", work.jobs[x].location);
        var formattedDescription = HTMLworkDescription.replace("%data%", work.jobs[x].description);
        var bothEmployerTitle = formattedEmployer + formattedTitle;

        $("#workExperience").append(HTMLworkStart);
        $(".work-entry:last").append(bothEmployerTitle, formattedDates, formattedLocation, formattedDescription);
      }
    }
  }
};

var projects = {
  projects: [
    {
      "title": "Trading Card",
      "dates": "2017",
      "description": "Used HTML and CSS to create a webased trading card prototype.",
      "images": ["images/Miley"]
    },
    {
      "title": "Portfolio Site",
      "dates": "2017",
      "description": "Used HTML, CSS and Bootsrap to create a Portfolio Site.",
      "images": ["images/Portfolio_site"]
    },
    {
      "title": "Online Resume",
      "dates": "2017",
      "description": "Wrote JavaScript to combine my personal information with pre-written HTML and CSS to generate my resume.",
      "images": ["images/onlineResume"]
    },
  ],
  display: function() {
    if (projects.projects.length > 0) {
      for (var x=0, xLength = projects.projects.length; x<xLength; x++) {
        var formattedTitle = HTMLprojectTitle.replace("%data%", projects.projects[x].title);
        var formattedDates = HTMLprojectDates.replace("%data%", projects.projects[x].dates);
        var formattedDescription = HTMLprojectDescription.replace("%data%", projects.projects[x].description);

        $("#projects").append(HTMLprojectStart);
        $(".project-entry:last").append(formattedTitle);
        $(".project-entry:last").append(formattedDates);
        $(".project-entry:last").append(formattedDescription);

        for (var y = 0, yLength = projects.projects[x].images.length; y<yLength; y++) {
          var formattedImage = HTMLprojectImage.replace("%data%", projects.projects[x].images[y]);
          $(".project-entry:last").append(formattedImage);
        }
      }
    }
  }
};

var education = {
  schools: [
    {
      "name": "Argosy University",
      "location": "San Diego, CA",
      "degree": "Master of Arts",
      "majors": ["Forensic Psychology"],
      "dates": "2014 - 2016",
      "url": "https://www.argosy.edu/"
    },
    {
      "name": "Ashford University",
      "location": "Clinton, IA",
      "degree": "Bachelor of Arts",
      "majors": ["Psychology"],
      "dates": "2010 - 2014",
      "url": "https://www.ashford.edu/"
    },
    {
      "name": "SAP NS2",
      "location": "Leesberg, VA",
      "degree": "SAP Certifications: HANA, Web Intelligence and DataServices.",
      "majors": ["Psychology"],
      "dates": "2010 - 2014",
      "url": "https://www.ashford.edu/"
    }
  ],
  onlineCourses: [
   {
     "title": "Front-End Web Developer Nanodegree",
     "school": "Udacity",
     "dates": "2017",
     "url": "https://www.udacity.com/"
   },
  ],
  display: function() {
    if (education.schools.length > 0 || education.onlineCourses.length > 0) {
      for (var x=0, xLength = education.schools.length; x<xLength; x++) {
        var formattedName = HTMLschoolName.replace("%data%", education.schools[x].name);
        var formattedDegree = HTMLschoolDegree.replace("%data%", education.schools[x].degree);
        var formattedSchoolDates = HTMLschoolDates.replace("%data%", education.schools[x].dates);
        var formattedLocation = HTMLschoolLocation.replace("%data%", education.schools[x].location);
        var BothNameDegree = formattedName + formattedDegree;

        $("#education").append(HTMLschoolStart);
        $(".education-entry:last").append(BothNameDegree);
        $(".education-entry:last").append(formattedSchoolDates);
        $(".education-entry:last").append(formattedLocation);

        for (var y=0, yLength = education.schools[x].majors.length; y<yLength; y++) {
          var formattedMajor = HTMLschoolMajor.replace("%data%", education.schools[x].majors[y]);
          $(".education-entry:last").append(formattedMajor);
        }
      }
      $("#education").append(HTMLonlineClasses);

      for (var z=0, length = education.onlineCourses.length; z<length; z++) {
        var formattedTitle = HTMLonlineTitle.replace("%data%", education.onlineCourses[z].title).replace("%data%", education.onlineCourses[z].url);
        var formattedSchool = HTMLonlineSchool.replace("%data%", education.onlineCourses[z].school);
        var formattedOnlineDates = HTMLonlineDates.replace("%data%", education.onlineCourses[z].dates);
        var formattedUrl = HTMLonlineURL.replace("%data%", education.onlineCourses[z].url);
        var BothTitleSchool = formattedTitle + formattedSchool;

        $("#education").append(HTMLschoolStart);
        $(".education-entry:last").append(BothTitleSchool);
        $(".education-entry:last").append(formattedOnlineDates);
        $(".education-entry:last").append(formattedUrl);
      }
    }
  }
};
$("#mapDiv").append(googleMap);

bio.display();
work.display();
projects.display();
education.display();
