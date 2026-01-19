import { TextBlock } from './text/TextBlock';
import { HeadingBlock } from './text/HeadingBlock';
import { ParagraphBlock } from './text/ParagraphBlock';
import { RichTextBlock } from './text/RichTextBlock';
import { CitationBlock } from './text/CitationBlock';
import { QuoteBlock } from './text/QuoteBlock';
import { HighlightBlock } from './text/HighlightBlock';

import { ImageBlock } from './media/ImageBlock';
import { GalleryBlock } from './media/GalleryBlock';
import { VideoBlock } from './media/VideoBlock';
import { AudioBlock } from './media/AudioBlock';

import { SectionBlock } from './layout/SectionBlock';
import { ColumnsBlock } from './layout/ColumnsBlock';
import { GridBlock } from './layout/GridBlock';
import { MasonryBlock } from './layout/MasonryBlock';
import { DividerBlock } from './layout/DividerBlock';
import { SpacerBlock } from './layout/SpacerBlock';

import { ButtonBlock } from './interactive/ButtonBlock';
import { TabsBlock } from './interactive/TabsBlock';
import { AccordionBlock } from './interactive/AccordionBlock';
import { FaqBlock } from './interactive/FaqBlock';

import { StatsBlock } from './data/StatsBlock';
import { TimelineBlock } from './data/TimelineBlock';
import { TimelineVerticalBlock } from './data/TimelineVerticalBlock';
import { CardsBlock } from './data/CardsBlock';
import { TestimonialsBlock } from './data/TestimonialsBlock';
import { TeamMemberBlock } from './data/TeamMemberBlock';
import { PricingBlock } from './data/PricingBlock';
import { FeatureBlock } from './data/FeatureBlock';
import { LeadershipListBlock } from './data/LeadershipListBlock';

import { MapBlock } from './integration/MapBlock';
import { IframeBlock } from './integration/IframeBlock';

import { ActivitiesStatsGridBlock } from './activities';
import { ActivitiesCategoriesBlock } from './activities';
import { ActivitiesTimelineBlock } from './activities';
import { ActivitiesFuturePlansBlock } from './activities';

import { ListBlock } from './special/ListBlock';
import { TableBlock } from './special/TableBlock';
import { VirtualListBlock } from './special/VirtualListBlock';
import { DynamicDataBlock } from './special/DynamicDataBlock';

export const blockRenderers = {
  // Text blocks
  text: TextBlock,
  heading: HeadingBlock,
  paragraph: ParagraphBlock,
  'rich-text': RichTextBlock,
  citation: CitationBlock,
  quote: QuoteBlock,
  highlight: HighlightBlock,

  // Media blocks
  image: ImageBlock,
  gallery: GalleryBlock,
  video: VideoBlock,
  audio: AudioBlock,

  // Layout blocks
  section: SectionBlock,
  columns: ColumnsBlock,
  grid: GridBlock,
  masonry: MasonryBlock,
  divider: DividerBlock,
  spacer: SpacerBlock,

  // Interactive blocks
  button: ButtonBlock,
  tabs: TabsBlock,
  accordion: AccordionBlock,
  faq: FaqBlock,

  // Data blocks
  stats: StatsBlock,
  timeline: TimelineBlock,
  'timeline-vertical': TimelineVerticalBlock,
  cards: CardsBlock,
  testimonials: TestimonialsBlock,
  'team-member': TeamMemberBlock,
  pricing: PricingBlock,
  feature: FeatureBlock,
  'leadership-list': LeadershipListBlock,

  // Integration blocks
  map: MapBlock,
  iframe: IframeBlock,

  // Activities blocks
  'activities-stats-grid': ActivitiesStatsGridBlock,
  'activities-categories': ActivitiesCategoriesBlock,
  'activities-timeline': ActivitiesTimelineBlock,
  'activities-future-plans': ActivitiesFuturePlansBlock,

  // Special blocks
  list: ListBlock,
  table: TableBlock,
  'virtual-list': VirtualListBlock,
  'dynamic-data': DynamicDataBlock,
};