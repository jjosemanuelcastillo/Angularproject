import { Component } from '@angular/core';

@Component({
  selector: 'app-help',
  imports: [],
  templateUrl: './help.component.html',
  styleUrl: './help.component.css'
})
export class HelpComponent {

  ngAfterViewInit(): void {
    const elements = document.querySelectorAll('.fade-in');

    const checkVisibility = () => {
      const triggerBottom = window.innerHeight * 0.85;
      elements.forEach(el => {
        const rect = el.getBoundingClientRect().top;
        if (rect < triggerBottom) {
          el.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', checkVisibility);
    checkVisibility();
  }
}
