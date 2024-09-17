// (function ($) {
//     // Document Ready
//     $(document).ready(function() {
//         // Toggle Dropdown
//         function toggleDropdown(event) {
//             event.preventDefault();
//             var dropdown = document.getElementById('imageDropdown');
//             if (dropdown) {
//                 dropdown.classList.toggle('active');
        
//                 // Close the dropdown when clicking somewhere else on the page
//                 document.body.addEventListener('click', function (e) {
//                     if (!dropdown.contains(e.target)) {
//                         dropdown.classList.remove('active');
//                     }
//                 });
//             }
//         }
        
//         // Instructors
//         const toggleMenu = document.querySelector(".menu-icon-container");
//         const sidebar = document.querySelector(".navbar-mobile");
//         const crossSidebar = document.querySelector(".navbar-mobile--cross");
//         let menuicon = document.querySelector(".menu-icon");
        
//         if (toggleMenu && sidebar && crossSidebar && menuicon) {
//             toggleMenu.addEventListener("click", function () {
//                 sidebar.classList.toggle("show");
//                 document.body.classList.toggle("over");
//             });
        
//             crossSidebar.addEventListener("click", function () {
//                 sidebar.classList.remove("show");
//                 menuicon.classList.remove("transformed");
//             });
//         }

//         var navMenu = [].slice.call(document.querySelectorAll(".navbar-mobile__menu-item"));
//         if (navMenu.length > 0) {
//             navMenu.forEach((el) => el.addEventListener("click", function () {
//                 menuClick(this);
//             }));
//         }
        
//         function menuClick(current) {
//             const active = current.classList.contains("open");
//             navMenu.forEach((el) => el.classList.remove("open"));
//             if (active) {
//                 current.classList.remove("open");
//             } else {
//                 current.classList.add("open");
//             }
//         }
        
//         if ($(".my-rating").length) {
//             $(".my-rating").starRating({
//                 starSize: 30,
//                 activeColor: "#FF7A1A",
//                 hoverColor: "#FF7A1A",
//                 ratedColors: ["#FF7A1A", "#FF7A1A", "#FF7A1A", "#FF7A1A", "#FF7A1A"],
//                 starShape: "rounded",
//             });
//         }

//         if ($(".menu-icon-container").length) {
//             $(".menu-icon-container").on("click", function () {
//                 $(".menu-icon").toggleClass("transformed");
//             });
//         }
        
//         // Checkout JS
//         function hide_signin(){
//             if ($('.signin').length && $('.signup').length) {
//                 $('.signin').toggle();
//                 $('.signup').toggle();
//             }
//         }
        
//         // Watch Courses
//         if ($('.videolist-area-wizard').length) {
//             $('.videolist-area-wizard').on('click', function() {
//                 var lessonDescription = $(this).data('lesson-description');
//                 var lessonNotes = $(this).data('lesson-notes');
//                 $('#nav-ldescrip .lesson-description p').html(lessonDescription);
//                 $('#nav-lnotes .course-notes-area .course-notes-item p').html(lessonNotes);
//             });
//         }

//         if ($('.main-wizard').length) {
//             $('.main-wizard').on('click', function() {
//                 var materialTitle = $(this).data('material-title');
//                 $('.material-title').html(materialTitle);
//             });
//         }
        
//         // Home
//         function drop() {
//             const dropBox = document.querySelector(".categoryDrop");
//             const arrow = document.querySelector(".select-button button svg");
//             if (dropBox && arrow) {
//                 arrow.classList.toggle("appear");
//                 dropBox.classList.toggle("appear");
//             }
//         }

//         // Search Course
//         const filterBtn = document.querySelector("#filter");
//         const cross = document.querySelector(".filter--cross");

//         if (filterBtn && cross) {
//             filterBtn.addEventListener("click", function () {
//                 let sidebar = document.querySelector(".filter-sidebar");
//                 if (sidebar) {
//                     sidebar.classList.toggle("active");
//                 }
//             });

//             cross.addEventListener("click", function () {
//                 let sidebar = document.querySelector(".filter-sidebar");
//                 if (sidebar) {
//                     sidebar.classList.remove("active");
//                 }
//             });
//         }
        
//         // Student Profile
//         if ($('#newImageInput').length && $('#changeImageButton').length && $('#changeImageForm').length) {
//             $('#newImageInput').hide();
//             $('#changeImageButton').click(function() {
//                 $('#newImageInput').click();
//             });
//             $('#newImageInput').change(function() {
//                 $('#changeImageForm').submit();
//             });
//         }

//         // Blog List and Detail
//         function drop() {
//             const dropBox = document.querySelector(".categoryDrop");
//             const arrow = document.querySelector(".select-button button svg");
//             if (dropBox && arrow) {
//                 arrow.classList.toggle("appear");
//                 dropBox.classList.toggle("appear");
//             }
//         }

//         // Initialize Slick Slider
//         if ($('.brand-area').length) {
//             $('.brand-area').slick({
//                 slidesToShow: 4,
//                 slidesToScroll: 1,
//                 autoplay: true,
//                 autoplaySpeed: 2000,
//                 arrows: false,
//                 dots: false,
//                 responsive: [
//                     {
//                         breakpoint: 1024,
//                         settings: {
//                             slidesToShow: 3,
//                             slidesToScroll: 1,
//                             infinite: true,
//                         }
//                     },
//                     {
//                         breakpoint: 600,
//                         settings: {
//                             slidesToShow: 2,
//                             slidesToScroll: 1
//                         }
//                     },
//                     {
//                         breakpoint: 480,
//                         settings: {
//                             slidesToShow: 1,
//                             slidesToScroll: 1
//                         }
//                     }
//                 ]
//             });
//         }
//     });
// })(jQuery);





(function ($) {
    // Document Ready
    $(document).ready(function() {
        
        // Toggle Dropdown
        function toggleDropdown(event) {
            event.preventDefault();
            var dropdown = document.getElementById('imageDropdown');
            if (dropdown) {
                dropdown.classList.toggle('active');
        
                // Close the dropdown when clicking somewhere else on the page
                document.body.addEventListener('click', function (e) {
                    if (!dropdown.contains(e.target)) {
                        dropdown.classList.remove('active');
                    }
                });
            }
        }
        
        // Instructors
        const toggleMenu = document.querySelector(".menu-icon-container");
        const sidebar = document.querySelector(".navbar-mobile");
        const crossSidebar = document.querySelector(".navbar-mobile--cross");
        let menuicon = document.querySelector(".menu-icon");
        
        if (toggleMenu && sidebar && crossSidebar && menuicon) {
            toggleMenu.addEventListener("click", function () {
                sidebar.classList.toggle("show");
                document.body.classList.toggle("over");
            });
        
            crossSidebar.addEventListener("click", function () {
                sidebar.classList.remove("show");
                menuicon.classList.remove("transformed");
            });
        }

        var navMenu = [].slice.call(document.querySelectorAll(".navbar-mobile__menu-item"));
        if (navMenu.length > 0) {
            navMenu.forEach((el) => el.addEventListener("click", function () {
                menuClick(this);
            }));
        }
        
        function menuClick(current) {
            const active = current.classList.contains("open");
            navMenu.forEach((el) => el.classList.remove("open"));
            if (active) {
                current.classList.remove("open");
            } else {
                current.classList.add("open");
            }
        }
        
        if ($(".my-rating").length) {
            $(".my-rating").starRating({
                starSize: 30,
                activeColor: "#FF7A1A",
                hoverColor: "#FF7A1A",
                ratedColors: ["#FF7A1A", "#FF7A1A", "#FF7A1A", "#FF7A1A", "#FF7A1A"],
                starShape: "rounded",
            });
        }

        if ($(".menu-icon-container").length) {
            $(".menu-icon-container").on("click", function () {
                $(".menu-icon").toggleClass("transformed");
            });
        }
        
        // Checkout JS
        function hide_signin(){
            if ($('.signin').length && $('.signup').length) {
                $('.signin').toggle();
                $('.signup').toggle();
            }
        }
        
        // Watch Courses
        if ($('.videolist-area-wizard').length) {
            $('.videolist-area-wizard').on('click', function() {
                var lessonDescription = $(this).data('lesson-description');
                var lessonNotes = $(this).data('lesson-notes');
                $('#nav-ldescrip .lesson-description p').html(lessonDescription);
                $('#nav-lnotes .course-notes-area .course-notes-item p').html(lessonNotes);
            });
        }

        if ($('.main-wizard').length) {
            $('.main-wizard').on('click', function() {
                var materialTitle = $(this).data('material-title');
                $('.material-title').html(materialTitle);
            });
        }
        
        // Home
        function drop() {
            const dropBox = document.querySelector(".categoryDrop");
            const arrow = document.querySelector(".select-button button svg");
            if (dropBox && arrow) {
                arrow.classList.toggle("appear");
                dropBox.classList.toggle("appear");
            }
        }

        // Search Course
        const filterBtn = document.querySelector("#filter");
        const cross = document.querySelector(".filter--cross");

        if (filterBtn && cross) {
            filterBtn.addEventListener("click", function () {
                let sidebar = document.querySelector(".filter-sidebar");
                if (sidebar) {
                    sidebar.classList.toggle("active");
                }
            });

            cross.addEventListener("click", function () {
                let sidebar = document.querySelector(".filter-sidebar");
                if (sidebar) {
                    sidebar.classList.remove("active");
                }
            });
        }
        
        // Student Profile
        if ($('#newImageInput').length && $('#changeImageButton').length && $('#changeImageForm').length) {
            $('#newImageInput').hide();
            $('#changeImageButton').click(function() {
                $('#newImageInput').click();
            });
            $('#newImageInput').change(function() {
                $('#changeImageForm').submit();
            });
        }

        // Blog List and Detail
        function drop() {
            const dropBox = document.querySelector(".categoryDrop");
            const arrow = document.querySelector(".select-button button svg");
            if (dropBox && arrow) {
                arrow.classList.toggle("appear");
                dropBox.classList.toggle("appear");
            }
        }
    });
})(jQuery);
