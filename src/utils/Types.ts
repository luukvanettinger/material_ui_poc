export interface Riff {
    id: string;
    difficulty?: number;
    name: string;
    number_of_bars: number;
    chord_info: string;
    chord?: string;
    multi_chord: boolean;
    image?: string;
    render_valid: boolean;
    render_date?: string;
    created_at: string;
}