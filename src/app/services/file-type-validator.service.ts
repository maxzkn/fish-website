import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileTypeValidatorService {
  private imageFileTypes = [
    'image/jpg',
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/bmp',
    'image/svg+xml',
  ]

  constructor() { }

  validateFile(file: File): boolean {
    return this.imageFileTypes.includes(file.type);
  }
}
