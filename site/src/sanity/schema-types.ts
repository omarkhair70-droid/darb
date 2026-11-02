import { defineType, defineField } from "sanity";

const localizedString = defineType({
  name:"localizedString",title:"Localized text",type:"object",
  fields:[
    defineField({name:"ar",title:"Arabic",type:"string",validation:rule=>rule.required()}),
    defineField({name:"en",title:"English",type:"string",validation:rule=>rule.required()}),
  ]
});
const localizedText = defineType({
  name:"localizedText",title:"Localized long text",type:"object",
  fields:[
    defineField({name:"ar",title:"Arabic",type:"text",rows:4,validation:rule=>rule.required()}),
    defineField({name:"en",title:"English",type:"text",rows:4,validation:rule=>rule.required()}),
  ]
});
const project = defineType({
  name:"project",title:"Project / Exhibition",type:"document",
  fields:[
    defineField({name:"published",type:"boolean",title:"Approved for public archive",initialValue:false}),
    defineField({name:"title",type:"localizedString",validation:rule=>rule.required()}),
    defineField({name:"slug",type:"slug",options:{source:"title.en"},validation:rule=>rule.required()}),
    defineField({name:"kind",type:"string",options:{list:["exhibition","festival","workshop","programme","residency"].map(value=>({title:value,value}))},validation:rule=>rule.required()}),
    defineField({name:"year",type:"number",validation:rule=>rule.required().min(2000).max(2100)}),
    defineField({name:"sourcePage",type:"number",title:"Overview PDF page (if imported)",validation:rule=>rule.min(1).max(21)}),
    defineField({name:"description",type:"localizedText",validation:rule=>rule.required()}),
    defineField({name:"dateLabel",title:"Date label (historical and exact where known)",type:"localizedString",validation:rule=>rule.required()}),
    defineField({name:"venue",type:"localizedString"}),
    defineField({name:"coverAssetName",title:"Approved archival filename (pdf_image_XXXX.png/jpeg)",type:"string",description:"Only use rights-cleared images copied to public/media by the build pipeline."}),
    defineField({name:"imageAlt",type:"localizedString"}),
    defineField({name:"peopleNames",type:"array",of:[{type:"string"}]}),
    defineField({name:"related",type:"array",of:[{type:"reference",to:[{type:"project"}]}]}),
    defineField({name:"sources",type:"array",of:[{type:"reference",to:[{type:"source"}]}]}),
    defineField({name:"editorialApproval",type:"boolean",initialValue:false,title:"Artist/source credits verified"}),
  ],
  preview:{select:{title:"title.en",subtitle:"kind"}}
});
const event=defineType({
  name:"event",title:"Event occurrence",type:"document",
  fields:[
    defineField({name:"title",type:"localizedString",validation:r=>r.required()}),
    defineField({name:"slug",type:"slug",options:{source:"title.en"},validation:r=>r.required()}),
    defineField({name:"startAt",type:"datetime"}),
    defineField({name:"endAt",type:"datetime"}),
    defineField({name:"status",type:"string",options:{list:["draft","confirmed","postponed","cancelled","finished"]},initialValue:"draft"}),
    defineField({name:"registrationUrl",type:"url",validation:r=>r.uri({scheme:["https"]})}),
    defineField({name:"project",type:"reference",to:[{type:"project"}]}),
    defineField({name:"venue",type:"reference",to:[{type:"place"}]}),
    defineField({name:"published",type:"boolean",initialValue:false}),
  ]
});
const place=defineType({
  name:"place",title:"Place",type:"document",
  fields:[
    defineField({name:"name",type:"localizedString",validation:r=>r.required()}),
    defineField({name:"verifiedCurrent",type:"boolean",initialValue:false,title:"Verified currently usable"}),
    defineField({name:"address",type:"localizedText"}),
    defineField({name:"verifiedAt",type:"datetime"}),
    defineField({name:"accessNotes",type:"localizedText"}),
  ]
});
const person=defineType({
  name:"person",title:"Publicly credited person",type:"document",
  fields:[
    defineField({name:"displayName",type:"localizedString",validation:r=>r.required()}),
    defineField({name:"slug",type:"slug",options:{source:"displayName.en"}}),
    defineField({name:"publicRole",type:"localizedString"}),
    defineField({name:"biography",type:"localizedText"}),
    defineField({name:"approvedForPublication",type:"boolean",initialValue:false}),
    defineField({name:"source",type:"reference",to:[{type:"source"}]}),
  ]
});
const artwork=defineType({
  name:"artwork",title:"Artwork",type:"document",
  fields:[
    defineField({name:"title",type:"localizedString",validation:r=>r.required()}),
    defineField({name:"artist",type:"reference",to:[{type:"person"}]}),
    defineField({name:"project",type:"reference",to:[{type:"project"}]}),
    defineField({name:"year",type:"number"}),
    defineField({name:"material",type:"localizedString"}),
    defineField({name:"media",type:"array",of:[{type:"reference",to:[{type:"mediaRecord"}]}]}),
    defineField({name:"approvedForPublication",type:"boolean",initialValue:false}),
  ]
});
const mediaRecord=defineType({
  name:"mediaRecord",title:"Media and rights ledger",type:"document",
  fields:[
    defineField({name:"archiveFilename",type:"string"}),
    defineField({name:"sourcePage",type:"number"}),
    defineField({name:"photographerCredit",type:"string"}),
    defineField({name:"artistCredit",type:"string"}),
    defineField({name:"caption",type:"localizedText"}),
    defineField({name:"alt",type:"localizedString"}),
    defineField({name:"consentStatus",type:"string",options:{list:["pending","approved","restricted"]},initialValue:"pending"}),
    defineField({name:"publicationScope",type:"string",options:{list:["internal","site","press"]},initialValue:"internal"}),
    defineField({name:"image",type:"image",options:{hotspot:true}}),
  ]
});
const story=defineType({
  name:"story",title:"Editorial story",type:"document",
  fields:[
    defineField({name:"title",type:"localizedString",validation:r=>r.required()}),
    defineField({name:"slug",type:"slug",options:{source:"title.en"},validation:r=>r.required()}),
    defineField({name:"summary",type:"localizedText"}),
    defineField({name:"relatedProjects",type:"array",of:[{type:"reference",to:[{type:"project"}]}]}),
    defineField({name:"published",type:"boolean",initialValue:false}),
  ]
});
const source=defineType({
  name:"source",title:"Research source",type:"document",
  fields:[
    defineField({name:"title",type:"string",validation:r=>r.required()}),
    defineField({name:"url",type:"url"}),
    defineField({name:"sourceDate",type:"date"}),
    defineField({name:"sourceType",type:"string",options:{list:["official","artist","press","directory","commissioner-supplied"]}}),
    defineField({name:"notes",type:"text"}),
  ]
});
const opportunity=defineType({
  name:"opportunity",title:"Open call / participation",type:"document",
  fields:[
    defineField({name:"title",type:"localizedString",validation:r=>r.required()}),
    defineField({name:"deadline",type:"datetime"}),
    defineField({name:"applicationUrl",type:"url"}),
    defineField({name:"status",type:"string",options:{list:["draft","confirmed-open","closed","cancelled"]},initialValue:"draft"}),
    defineField({name:"confirmedByStaff",type:"boolean",initialValue:false}),
  ]
});
// This is a review-ready schema, not an active institutional CMS dataset.
// Film and contribution records must not publish from a URL alone.
const film=defineType({
 name:"film",title:"Film — authored work",type:"document",
 fields:[
  defineField({name:"title",type:"localizedString",validation:r=>r.required()}),
  defineField({name:"slug",type:"slug",options:{source:"title.en"},validation:r=>r.required()}),
  defineField({name:"director",type:"reference",to:[{type:"person"}],validation:r=>r.required()}),
  defineField({name:"programme",type:"reference",to:[{type:"project"}]}),
  defineField({name:"context",type:"localizedText"}),
  defineField({name:"officialVideoUrl",type:"url",description:"Official publisher link only, not an uploaded film master."}),
  defineField({name:"publisherName",type:"string"}),
  defineField({name:"screeningDate",type:"date",description:"Only after programme/staff verification."}),
  defineField({name:"screeningVenue",type:"reference",to:[{type:"place"}]}),
  defineField({name:"evidence",type:"array",of:[{type:"reference",to:[{type:"source"}]}]}),
  defineField({name:"mediaRightsStatus",type:"string",options:{list:["pending","official-link-only","licensed","restricted"]},initialValue:"pending"}),
  defineField({name:"editorialApproved",type:"boolean",initialValue:false}),
  defineField({name:"published",type:"boolean",initialValue:false})
 ]
});
const contribution=defineType({
 name:"contribution",title:"Credited contribution",type:"document",
 fields:[
   defineField({name:"person",type:"reference",to:[{type:"person"}],validation:r=>r.required()}),
   defineField({name:"film",type:"reference",to:[{type:"film"}],validation:r=>r.required()}),
   defineField({name:"role",type:"string",options:{list:["director","researcher","cinematographer","sound","editor","curator","other"]},validation:r=>r.required()}),
   defineField({name:"source",type:"reference",to:[{type:"source"}],validation:r=>r.required()}),
   defineField({name:"verified",type:"boolean",initialValue:false})
 ]
});
export const schemaTypes=[localizedString,localizedText,project,event,place,person,artwork,film,contribution,mediaRecord,story,source,opportunity];
