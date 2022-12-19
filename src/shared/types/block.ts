export type BlockId = string;

export type Block = {
  id: BlockId
  // type: 'full' | 'white-space' | 'page-break'
  // layout: 'full'
  section:
    | 'profile'
    | 'contact'
    | 'photo'
    | 'skills'
    | 'experience'
    | 'projects'
  height: number
}
