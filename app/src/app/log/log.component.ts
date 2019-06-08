import { Component, OnInit } from '@angular/core';
import { LogService } from './log.service/log.service';

@Component({
  selector: 'app-messages',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  constructor(public messageService: LogService) {}

  ngOnInit() {
  }

}
