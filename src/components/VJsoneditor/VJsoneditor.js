// https://github.com/josdejong/jsoneditor/blob/master/docs/api.md
import JSONEditor from 'jsoneditor/dist/jsoneditor.min';
import 'jsoneditor/dist/jsoneditor.min.css';

const modes = [
  'tree',
  'view',
  'form',
  'code',
  'text',
];

export default {
  name: 'v-jsoneditor',
  props: {
    options: {
      type: Object,
      default() {
        return {
        };
      },
    },
    value: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      jsoneditor: null,
    };
  },
  methods: {
    getOptions() {
      const defaults = {
        escapeUnicode: false,
        history: true,
        indentation: 2,
        mode: modes[0],
        modes: modes.slice(0),
        navigationBar: true,
        search: true,
        statusBar: true,
        sortObjectKeys: false,
      };

      return Object.assign({}, defaults, this.options, {
        onChange: this.onChange,
        onError: this.onError,
      });
    },
    onChange() {
      this.$emit('input', this.jsoneditor.get());
    },
    onError(error) {
      this.$emit('error', error);
    },
  },
  render(h) {
    return h('div', {
      ref: 'jsoneditor',
    });
  },
  mounted() {
    this.jsoneditor = new JSONEditor(
      this.$refs.jsoneditor,
      this.getOptions(),
      this.value,
    );

    this.onChange();
  },
  beforeDestroy() {
    this.jsoneditor.destroy();
    this.jsoneditor = null;
  },
};
