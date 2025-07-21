interface ScrollTimelineOptions {
    source: Element | Document;
    orientation?: 'inline' | 'block';
    scrollOffsets?: Array<CSSNumberish>;
}

declare class ScrollTimeline implements AnimationTimeline {
    constructor(options: ScrollTimelineOptions);
    currentTime: number | null;
    readonly animationTiming: AnimationEffectTiming;
}
