import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'progress-bar',
  template: `
    <div 
      class="progress-bar-container"
      [style.backgroundColor]="backgroundColor"
    >
      <div 
        class="progress"
        [style]="{
          backgroundColor: progressColor,
          width: progress + '%'
        }"
        >
      </div>
    </div>
  `,
  styles: [
    `
      .progress-bar-container,
      .progress {
        height: 20px;
      }

      .progress-bar-container {
        width: 100%;
      }
    `,
  ],
})
export class ProgressBarComponent implements OnInit, OnChanges {
  // validate dữ liệu bên ngoài ngOnChanges
  private _progress = 50;
  get progress() {
    return this._progress;
  }
  @Input() set progress(val: number) {
    // validation
    if (typeof val !== 'number') {
      const progress = Number(val);
      if (Number.isNaN(progress)) {
        this._progress = 0;
      } else {
        this._progress = progress;
      }
    }
    this._progress = val;
    if (val > 70) {
      this.progressColor = 'red';
    }
  }

  // @Input() progress = 50;
  @Input() backgroundColor = '#ccc';
  @Input() progressColor = 'tomato';

  ngOnInit() {
    console.log('init', {
      progress: this.progress,
      backgroundColor: this.backgroundColor,
      progressColor: this.progressColor,
    });
  }

  // ngOninit chạy default values trước nếu không có default thì mặc định các property trong console.log sẽ là undefined
  // Nếu có @Input() thì ngOnChanges sẽ chạy trước để bind các giá trị này sau đó ngOninit mới chạy

  // ngOninit chỉ chạy một lần sau khi dữ liệu được bind vào nên khi click gọi hàm increase progress thì nó sẽ không chạy lại mà chỉ có ngOnChanges chạy thôi do vậy để validate dữ liệu thì chúng ta sử dụng ngOnChanges
  ngOnChanges(changes: SimpleChanges) {
    console.log('changes', {
      progress: this.progress,
      backgroundColor: this.backgroundColor,
      progressColor: this.progressColor,
    });

    if (this.progress > 80) {
      this.progressColor = 'green';
    }
  }
}
