import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const publicDir = path.join(process.cwd(), 'public');
    const baseDir = path.join(publicDir, 'Iamgens ECO');

    const getImagesFromFolder = (folderName: string) => {
      const folderPath = path.join(baseDir, folderName);
      if (!fs.existsSync(folderPath)) return [];
      
      const files = fs.readdirSync(folderPath);
      return files
        .filter(file => {
          const ext = path.extname(file).toLowerCase();
          // Filtra apenas formatos web suportados nativamente (evitando HEIC que quebra no navegador e MP4 que é vídeo)
          return ['.jpg', '.jpeg', '.png', '.webp', '.png'].includes(ext);
        })
        .map(file => `/Iamgens ECO/${folderName}/${file}`);
    };

    const data = {
      trilhas: getImagesFromFolder('Trilhas Ecologicas'),
      camping: getImagesFromFolder('Camping'),
      fogueira: getImagesFromFolder('Fogueira'),
      kids: getImagesFromFolder('espaço kids'),
      sobrevivencia: getImagesFromFolder('sobrevivencia'),
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error('Erro ao ler imagens das pastas:', error);
    return NextResponse.json({ error: 'Erro ao carregar imagens' }, { status: 500 });
  }
}
