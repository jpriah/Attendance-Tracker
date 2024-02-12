defined('MOODLE_INTERNAL') || die();

function local_quiz_builder_extend_navigation(global_navigation $navigation) {
    $url = new moodle_url('/local/quiz_builder/view.php');
    $node = navigation_node::create('Quiz Builder', $url, navigation_node::TYPE_CUSTOM, 'quiz_builder', 'quiz_builder', new pix_icon('i/quiz', ''));
    $navigation->add_node($node);
    return true;
}
