
var animationsSupported = false;

// Check for support of CSS animations
var animationElement = document.createElement('div');
if (animationElement.style.animationName !== undefined) {
    animationsSupported = true;
}

// If animations are supported, add a class to the body to enable animations
if (animationsSupported) {
    document.body.classList.add('animations-enabled');
} else {
    document.body.classList.add('animations-disabled');
}

window.addEventListener('scroll', doAllAnimations);
window.addEventListener('load', doAllAnimations);

//progress bar
var progressBar= document.querySelectorAll(".progress-bar");
var progressBarBox= document.querySelector(".progress-bar-box");

var interval= new Array(progressBar.length);
var progress= new Array(progressBar.length);
var delay= new Array(progressBar.length);
var delayIncr= 15;

//hero anim
var heroAnimBox= document.querySelector(".hero-anim-box");
var heroAnimPart= document.querySelectorAll(".hero-anim");
var index=0;

//services anim
var servicesAnimBox= document.querySelector(".services-anim-box");
var servicesAnimPart= document.querySelectorAll(".services-anim");
var sIndex=0;

//services anim
var skillsAnimBox= document.querySelector(".skills-anim-box");
var skillsAnimPart= document.querySelectorAll(".skills-anim");
var skIndex=0;

//display picture
var dp1= document.querySelector(".dp-1");
var dp2= document.querySelector(".dp-2");
var dpInterval;
var dpShownIndex=0;


function doAllAnimations()
{
    //progress bar
    for (let i = 0; i < progressBar.length; i++) {
        if(isInView(progressBarBox) && !progressBar[i].classList.contains('progressing') && !progressBar[i].classList.contains('progress-complete'))
        {
            progress[i]= 1;

            if(!progressBar[i].classList.contains('progressing'))
            progressBar[i].classList.add('progressing');

            if(i==0)
            {
                delay[i]= delayIncr;
            }
            else
            {
                delay[i]= (i+1)*delayIncr;
            }

            interval[i]= setInterval(frame, 10);

            function frame() {
                if (progress[i] >= parseInt(progressBar[i].dataset.progress)) {
                    clearInterval(interval[index]);
                    interval[i] = undefined;
                    progressBar[i].classList.add('progress-complete');
                } else {

                    if(delay[i]>0)
                    {
                        delay[i]--;
                        return;
                    }

                    progress[i]++;
                    progressBar[i].style.background =  "radial-gradient(closest-side, #120E21 79%, transparent 80% 100%), conic-gradient(#FFC80B "+progress[i].toString() +"%, gray 0)";
                }
              }
        }
    }

    //hero anim
    if(!heroAnimBox.classList.contains('has-animated') && !heroAnimBox.classList.contains('is-animating') && isInView(heroAnimBox))
    heroAnimation();

    //services anim
    if(!servicesAnimBox.classList.contains('has-animated') && !servicesAnimBox.classList.contains('is-animating') && isInView(servicesAnimBox))
    myServicesAnimation();

    //services anim
    if(!skillsAnimBox.classList.contains('has-animated') && !skillsAnimBox.classList.contains('is-animating') && isInView(skillsAnimBox))
    mySkillsAnimation();

    //dp anim
    if(dpInterval==undefined)
    {
        dpInterval= setInterval(spin, 5000);
        dp1.classList.add('show');
        dp2.classList.add('hide');

    }

}

function heroAnimation()
{
    if(!heroAnimBox.classList.contains('is-animating'))
    {
        heroAnimBox.classList.add('is-animating')
    }
    
    heroAnimPart[index].classList.remove('hide');
    heroAnimPart[index].classList.remove('no-anim');

    if(index+1<heroAnimPart.length)
    {
        heroAnimPart[index].addEventListener('animationend', animateNext);
    }
    else
    {
        heroAnimPart[index-1].removeEventListener('animationend', animateNext);
        heroAnimBox.classList.add('has-animated');
    }

    function animateNext()
    {
        index++;
        heroAnimation();
        heroAnimPart[index-1].removeEventListener('animationend', animateNext);
    }
    
}

function myServicesAnimation()
{
    if(!servicesAnimBox.classList.contains('is-animating'))
    {
        servicesAnimBox.classList.add('is-animating')
    }
    
    servicesAnimPart[sIndex].classList.remove('hide');
    servicesAnimPart[sIndex].classList.remove('no-anim');

    if(sIndex+1<servicesAnimPart.length)
    {
        servicesAnimPart[sIndex].addEventListener('animationend', animateNext);
    }
    else
    {
        servicesAnimPart[sIndex-1].removeEventListener('animationend', animateNext);
        servicesAnimPart.classList.add('has-animated');
    }

    function animateNext()
    {
        sIndex++;
        myServicesAnimation();
        servicesAnimPart[sIndex-1].removeEventListener('animationend', animateNext);
    }
    
}

function mySkillsAnimation()
{
    if(!skillsAnimBox.classList.contains('is-animating'))
    {
        skillsAnimBox.classList.add('is-animating')
    }
    
    skillsAnimPart[skIndex].classList.remove('hide');
    skillsAnimPart[skIndex].classList.remove('no-anim');

    if(skIndex+1<skillsAnimPart.length)
    {
        skillsAnimPart[skIndex].addEventListener('animationend', animateNext);
    }
    else
    {
        skillsAnimPart[skIndex-1].removeEventListener('animationend', animateNext);
        skillsAnimPart.classList.add('has-animated');
    }

    function animateNext()
    {
        skIndex++;
        mySkillsAnimation();
        servicesAnimPart[skIndex-1].removeEventListener('animationend', animateNext);
    }
    
}

function spin()
{
    if(dpShownIndex==0)
    {
        if(dp2.classList.contains('hide') || !dp2.classList.contains('show'))
        {
            dp2.classList.remove('hide');
            dp2.classList.add('show');
        }   

        if(dp1.classList.contains('spin-reveal'))
        dp1.classList.remove('spin-reveal');

        if(!dp1.classList.contains('spin-hide'))
        dp1.classList.add('spin-hide');

        if(!dp2.classList.contains('spin-reveal'))
        dp2.classList.add('spin-reveal');

        if(dp2.classList.contains('spin-hide'))
        dp2.classList.remove('spin-hide');

        dpShownIndex= 1;

        dp1.addEventListener('animationend', hide(dp1));
    }
    else{
        
        if(dp1.classList.contains('hide') || !dp1.classList.contains('show'))
        {
            dp1.classList.remove('hide');
            dp1.classList.add('show');
        }

        if(dp2.classList.contains('spin-reveal'))
        dp2.classList.remove('spin-reveal');

        if(!dp2.classList.contains('spin-hide'))
        dp2.classList.add('spin-hide');

        if(!dp1.classList.contains('spin-reveal'))
        dp1.classList.add('spin-reveal');

        if(dp1.classList.contains('spin-hide'))
        dp1.classList.remove('spin-hide');

        dpShownIndex= 0;

        dp2.addEventListener('animationend', hide(dp2));
    }

    function hide(elem)
    {
        elem.classList.add('hide');
        elem.classList.remove('show');
    }
    
}



function isInView(elem) {
    var bounding = elem.getBoundingClientRect();
    return (
        ((bounding.top >= 0) &&
            (bounding.top <= (window.innerHeight || document.documentElement.clientHeight))) ||
        ((bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)) &&
            bounding.bottom >= 0)
    );
}

