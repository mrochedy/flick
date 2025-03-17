import { Change, diffLines } from "diff";

export interface DiffLine {
  content: string;
  type: "added" | "removed" | "unchanged";
}

export function computeDiff(currentContent: string, previousContent: string): DiffLine[] {
  if (currentContent === previousContent) return returnAllLinesAsUnchanged(currentContent);

  const diffResult = getDiff(currentContent, previousContent);
  return getDiffLines(diffResult);
}

function returnAllLinesAsUnchanged(currentContent: string): DiffLine[] {
  return (currentContent || "").split("\n").map((line) => ({
    content: line,
    type: "unchanged",
  }));
}

function getDiff(currentContent: string, previousContent: string): Change[] {
  const diffResult = diffLines(previousContent || "", currentContent || "", {
    ignoreWhitespace: true,
  });

  return diffResult;
}

function getDiffLines(diffResult: Change[]): DiffLine[] {
  const diffLines: DiffLine[] = [];

  for (const part of diffResult) {
    const lines = splitDiffPartIntoLines(part);
    loopThroughLinesAndAddToDiffLines(lines, part, diffLines);
  }

  return diffLines;
}

function splitDiffPartIntoLines(part: Change): string[] {
  const lines = part.value.split("\n");
  return trimLastLineIfEmpty(lines);
}

function trimLastLineIfEmpty(lines: string[]): string[] {
  const shouldTrimLastLine = lines.length > 1 && lines[lines.length - 1] === "";
  return shouldTrimLastLine ? lines.slice(0, -1) : lines;
}

function loopThroughLinesAndAddToDiffLines(lines: string[], part: Change, diffLines: DiffLine[]): void {
  for (const line of lines) {
    addLineToDiffLines(diffLines, line, part);
  }
}

function addLineToDiffLines(diffLines: DiffLine[], line: string, part: Change): void {
  if (part.added) {
    diffLines.push({ content: line, type: "added" });
  } else if (part.removed) {
    diffLines.push({ content: line, type: "removed" });
  } else {
    diffLines.push({ content: line, type: "unchanged" });
  }
}
