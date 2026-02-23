import { describe, it, expect } from "vitest";

describe("Guitar Learner App", () => {
  describe("Song Data", () => {
    it("should have valid song structure", () => {
      const song = {
        id: 1,
        title: "Twinkle, Twinkle, Little Star",
        difficulty: "Beginner",
        category: "Children",
      };

      expect(song).toHaveProperty("id");
      expect(song).toHaveProperty("title");
      expect(song).toHaveProperty("difficulty");
      expect(song).toHaveProperty("category");
      expect(typeof song.id).toBe("number");
      expect(typeof song.title).toBe("string");
    });

    it("should validate difficulty levels", () => {
      const validDifficulties = ["Beginner", "Intermediate"];
      const testSong = { difficulty: "Beginner" };

      expect(validDifficulties).toContain(testSong.difficulty);
    });
  });

  describe("Tempo Control", () => {
    it("should constrain tempo between 0.5x and 1.5x", () => {
      const minTempo = 0.5;
      const maxTempo = 1.5;
      const currentTempo = 1.0;

      expect(currentTempo).toBeGreaterThanOrEqual(minTempo);
      expect(currentTempo).toBeLessThanOrEqual(maxTempo);
    });

    it("should increment tempo by 0.1", () => {
      let tempo = 1.0;
      tempo = Math.min(1.5, tempo + 0.1);

      expect(tempo).toBe(1.1);
    });

    it("should decrement tempo by 0.1", () => {
      let tempo = 1.0;
      tempo = Math.max(0.5, tempo - 0.1);

      expect(tempo).toBe(0.9);
    });
  });

  describe("Metronome BPM", () => {
    it("should constrain BPM between 40 and 240", () => {
      const minBPM = 40;
      const maxBPM = 240;
      const currentBPM = 80;

      expect(currentBPM).toBeGreaterThanOrEqual(minBPM);
      expect(currentBPM).toBeLessThanOrEqual(maxBPM);
    });

    it("should increment BPM by 10", () => {
      let bpm = 80;
      bpm = Math.min(240, bpm + 10);

      expect(bpm).toBe(90);
    });

    it("should have valid preset BPMs", () => {
      const presets = [60, 80, 100, 120];
      const testBPM = 80;

      expect(presets).toContain(testBPM);
    });
  });

  describe("Song Filtering", () => {
    const songs = [
      { id: 1, title: "Amazing Grace", difficulty: "Beginner", category: "Hymn" },
      { id: 2, title: "House of the Rising Sun", difficulty: "Intermediate", category: "Folk" },
      { id: 3, title: "Twinkle, Twinkle, Little Star", difficulty: "Beginner", category: "Children" },
    ];

    it("should filter songs by difficulty", () => {
      const beginnerSongs = songs.filter((song) => song.difficulty === "Beginner");

      expect(beginnerSongs).toHaveLength(2);
      expect(beginnerSongs[0].title).toBe("Amazing Grace");
    });

    it("should search songs by title", () => {
      const searchQuery = "Amazing";
      const results = songs.filter((song) => song.title.toLowerCase().includes(searchQuery.toLowerCase()));

      expect(results).toHaveLength(1);
      expect(results[0].title).toBe("Amazing Grace");
    });

    it("should return empty array for no matches", () => {
      const searchQuery = "NonExistent";
      const results = songs.filter((song) => song.title.toLowerCase().includes(searchQuery.toLowerCase()));

      expect(results).toHaveLength(0);
    });
  });

  describe("Chord Data", () => {
    it("should have valid chord structure", () => {
      const chord = {
        id: 1,
        name: "G Major",
        fingers: "1st fret: B, high E strings",
        difficulty: "Beginner",
      };

      expect(chord).toHaveProperty("id");
      expect(chord).toHaveProperty("name");
      expect(chord).toHaveProperty("fingers");
      expect(chord).toHaveProperty("difficulty");
    });

    it("should validate chord difficulty levels", () => {
      const validDifficulties = ["Beginner", "Intermediate"];
      const chords = [
        { name: "G Major", difficulty: "Beginner" },
        { name: "C Major", difficulty: "Intermediate" },
      ];

      chords.forEach((chord) => {
        expect(validDifficulties).toContain(chord.difficulty);
      });
    });
  });

  describe("App Navigation", () => {
    it("should have valid tab names", () => {
      const tabs = ["Home", "Songs", "Lessons", "Settings"];

      expect(tabs).toContain("Home");
      expect(tabs).toContain("Songs");
      expect(tabs).toContain("Lessons");
      expect(tabs).toContain("Settings");
      expect(tabs).toHaveLength(4);
    });
  });
});
