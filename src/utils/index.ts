import ffmpegPath from "ffmpeg-static";


export function getFfmpegPath(): string {
  const path = process.env.FFMPEG_PATH ?? (ffmpegPath as unknown as string);
  if (!path) {
    throw new Error('FFMPEG_PATH is not defined and fallback path is unavailable.');
  }
  return path;
}

export function getEnvVar(name: string): string {
    const value = process.env[name];
    if (!value) {
      throw new Error(`Environment variable ${name} is not set.`);
    }
    return value;
  }
  