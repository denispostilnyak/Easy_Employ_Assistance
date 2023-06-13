import { Component, OnInit, NgZone, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';

declare const annyang: any;

@Component({
	selector: 'app-voice-recognition',
	templateUrl: './voice-recognition.component.html',
	styleUrls: ['./voice-recognition.component.scss']
})
export class VoiceRecognitionComponent implements OnInit, OnChanges {
	@Input() voiceText: string;
	@Output() onTextChanged: EventEmitter<string> = new EventEmitter<string>();

	voiceActiveSectionDisabled: boolean = true;
	voiceActiveSectionError: boolean = false;
	voiceActiveSectionSuccess: boolean = false;
	voiceActiveSectionListening: boolean = false;
	textAreaData: string;

	constructor(private ngZone: NgZone) { }

	ngOnChanges(changes: SimpleChanges): void {
		this.textAreaData = changes.voiceText?.currentValue;
	}

	ngOnInit(): void {
	}

	initializeVoiceRecognitionCallback(): void {
		annyang.addCallback('error', (err) => {
			if (err.error === 'network') {
				this.voiceText = "Internet is require";
				annyang.abort();
				this.ngZone.run(() => this.voiceActiveSectionSuccess = true);
			} else if (this.voiceText === undefined) {
				this.ngZone.run(() => this.voiceActiveSectionError = true);
				annyang.abort();
			}
		});

		annyang.addCallback('soundstart', (res) => {
			this.ngZone.run(() => {this.voiceActiveSectionListening = true; this.getTextAreaData(); });
		});

		annyang.addCallback('end', () => {
			if (this.voiceText === undefined) {
				this.ngZone.run(() => this.voiceActiveSectionError = true);
				annyang.abort();
			}
		});

		annyang.addCallback('result', (userSaid) => {
			this.ngZone.run(() => this.voiceActiveSectionError = false);

			let queryText: any = userSaid[0];

			annyang.abort();

			this.voiceText = queryText;
			this.getTextAreaData();
			this.ngZone.run(() => this.voiceActiveSectionListening = false);
			this.ngZone.run(() => this.voiceActiveSectionSuccess = true);
		});
	}

	startVoiceRecognition(): void {
		this.voiceActiveSectionDisabled = false;
		this.voiceActiveSectionError = false;
		this.voiceActiveSectionSuccess = false;
		this.voiceText = undefined;
		this.getTextAreaData();
		if (annyang) {
			let commands = {
				'demo-annyang': () => { }
			};

			annyang.addCommands(commands);

			this.initializeVoiceRecognitionCallback();

			annyang.start({ autoRestart: false });
		}
	}

	closeVoiceRecognition(): void {
		this.voiceActiveSectionDisabled = true;
		this.voiceActiveSectionError = false;
		this.voiceActiveSectionSuccess = false;
		this.voiceActiveSectionListening = false;
		this.voiceText = undefined;

		if (annyang) {
			annyang.abort();
		}
	}

	getTextAreaData() {
		if (this.voiceText) {
			this.textAreaData = this.voiceText;
			this.onTextChanged.emit(this.voiceText);
		} else {
			if (this.voiceActiveSectionListening) {
				this.textAreaData = 'Listening';
			} else {
				this.textAreaData = 'Start talking...';
			}
		}
	}
}
